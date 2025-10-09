<?php

namespace App\Http\Controllers\Portal;

use App\Actions\Portal\Project\ProjectList;
use App\Actions\Portal\Project\ProjectCreate;

use App\Http\Requests\PageRequest;
use App\Http\Requests\Portal\ProjectRequest;

use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Str;

use Inertia\Response;
use Carbon\Carbon;

class ProjectController extends Controller{
    protected array $data = [];
    protected array $request = [];
    protected ?int $per_page;

    public function __construct(){
        parent::__construct();
        array_merge($this->data?:[], parent::get_data());
        $this->data['page_title'] .= "Project";
        $this->per_page = env("DEFAULT_PER_PAGE", 10);
    }

    public function index(PageRequest $request): Response {
        $this->data['page_title'] .= " - List";
        $this->data['keyword'] = Str::lower($request->get('keyword'));

        $action = new ProjectList($this->data, $this->per_page);
        $result = $action->execute();

        $this->data['record'] = $result['record'];

        return inertia('portal/projects/index', ['values' => $this->data]);
    }

    public function create(PageRequest $request): Response {
        $this->data['page_title'] .= " - Create";
        $this->data['users'] = \App\Models\User::where('status', 'active')->pluck('name', 'id')->toArray();

        return inertia('portal/projects/create', ['values' => $this->data]);
    }

    public function store(ProjectRequest $request): RedirectResponse {
        $this->request['name'] = $request->input('name');
        $this->request['start_date'] = $request->input('start_date');
        $this->request['due_date'] = $request->input('due_date');
        $this->request['owner'] = $request->input('owner');
        $this->request['members'] = $request->input('members');
        $this->request['description'] = $request->input('description');

        $action = new ProjectCreate($this->request);
        $result = $action->execute();

        session()->flash('notification-status', $result['status']);
        session()->flash('notification-msg', $result['message']);

        return $result['success'] ? redirect()->route('portal.projects.index') : redirect()->back();
    }

    public function show(PageRequest $request, ?int $id = null): Response|RedirectResponse {
        $this->data['page_title'] .= " - Show Project";

        $this->data['project'] = \App\Models\Project::with(['members', 'owner'])->find($id);

        if(!$this->data['project']){
            session()->flash('notification-status', 'failed');
            session()->flash('notification-msg', "Record not found.");

            return redirect()->route('portal.projects.index');
        }

        return inertia('portal/projects/show', ['values' => $this->data]);
    }
}