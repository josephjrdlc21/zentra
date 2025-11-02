<?php

namespace App\Http\Controllers\Portal;

use App\Actions\Portal\Task\BoardList;
use App\Actions\Portal\Task\TaskList;
use App\Actions\Portal\Task\TaskCreate;
use App\Actions\Portal\Task\TaskUpdate;
use App\Actions\Portal\Task\TaskUpdateStatus;
use App\Actions\Portal\Task\TaskDelete;

use App\Http\Requests\PageRequest;
use App\Http\Requests\Portal\TaskRequest;

use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Str;

use Inertia\Response;
use Inertia\Inertia;
use Carbon\Carbon;

class TaskController extends Controller{
    protected array $data = [];
    protected array $request = [];
    protected ?int $per_page;

    public function __construct(){
        parent::__construct();
        array_merge($this->data?:[], parent::get_data());
        $this->data['page_title'] .= "Task";
        $this->per_page = env("DEFAULT_PER_PAGE", 10);
    }

    public function index(PageRequest $request): Response {
        $this->data['page_title'] .= " - List";
        $this->data['keyword'] = Str::lower($request->get('keyword'));

        $action = new TaskList($this->data, $this->per_page);
        $result = $action->execute();

        $this->data['record'] = $result['record'];

        return inertia('portal/tasks/index', ['values' => $this->data]);
    }

    public function board(PageRequest $request): Response {
        $this->data['page_title'] .= " - List";
        $this->data['keyword'] = Str::lower($request->get('keyword'));

        $action = new BoardList($this->data, $this->per_page);
        $result = $action->execute();

        $this->data['record'] = $result['record'];

        return inertia('portal/tasks/board', ['values' => $this->data]);
    }

    public function create(PageRequest $request): Response {
        $this->data['page_title'] .= " - Create";
        $this->data['projects'] = \App\Models\Project::where('status', '!=', 'cancelled')->pluck('name', 'id')->toArray();
        $this->data['users'] = \App\Models\User::where('status', '!=', 'inactive')->pluck('name', 'id')->toArray();

        return inertia('portal/tasks/create', ['values' => $this->data]);
    }

    public function store(TaskRequest $request): RedirectResponse {
        $this->request['name'] = $request->input('name');
        $this->request['start_date'] = $request->input('start_date');
        $this->request['due_date'] = $request->input('due_date');
        $this->request['project'] = $request->input('project');
        $this->request['priority'] = $request->input('priority');
        $this->request['assigned_to'] = $request->input('assigned_to');
       
        $action = new TaskCreate($this->request);
        $result = $action->execute();

        session()->flash('notification-status', $result['status']);
        session()->flash('notification-msg', $result['message']);

        return $result['success'] ? redirect()->route('portal.tasks.board') : redirect()->back();
    }

    public function edit(PageRequest $request, ?int $id = null): Response|RedirectResponse {
        $this->data['page_title'] .= " - Edit Task";
        $this->data['projects'] = \App\Models\Project::where('status', '!=', 'cancelled')->pluck('name', 'id')->toArray();
        $this->data['users'] = \App\Models\User::where('status', '!=', 'inactive')->pluck('name', 'id')->toArray();
        $this->data['tasks'] = \App\Models\Task::with(['assigned', 'project'])->find($id);

        if(!$this->data['tasks']){
            session()->flash('notification-status', 'failed');
            session()->flash('notification-msg', "Record not found.");

            return redirect()->route('portal.boards.index');
        }

        return inertia('portal/tasks/edit', ['values' => $this->data]);
    }

    public function update(TaskRequest $request, ?int $id = null): RedirectResponse {
        $this->request['id'] = $id;
        $this->request['name'] = $request->input('name');
        $this->request['due_date'] = $request->input('due_date');
        $this->request['project'] = $request->input('project');
        $this->request['priority'] = $request->input('priority');
        $this->request['assigned_to'] = $request->input('assigned_to');
       
        $action = new TaskUpdate($this->request);
        $result = $action->execute();

        session()->flash('notification-status', $result['status']);
        session()->flash('notification-msg', $result['message']);

        return $result['success'] ? redirect()->route('portal.tasks.board') : redirect()->back();
    }

    public function update_status(PageRequest $request, ?int $id = null) {
        $this->request['id'] = $id;
        $this->request['status'] = $request->get('status');

        $action = new TaskUpdateStatus($this->request);
        $result = $action->execute();

        session()->flash('notification-status', $result['status']);
        session()->flash('notification-msg', $result['message']);

        return $result['success'] ? redirect()->route('portal.tasks.show', $this->request['id']) : redirect()->back();
    }

    public function show(PageRequest $request, ?int $id = null): Response|RedirectResponse {
        $this->data['page_title'] .= " - Show Task";

        $this->data['tasks'] = \App\Models\Task::with(['assigned', 'project'])->find($id);

        if(!$this->data['tasks']){
            session()->flash('notification-status', 'failed');
            session()->flash('notification-msg', "Record not found.");

            return redirect()->route('portal.tasks.board');
        }

        return inertia('portal/tasks/show', ['values' => $this->data]);
    }

    public function destroy(PageRequest $request, ?int $id = null): RedirectResponse {
        $this->request['id'] = $id;
        
        $action = new TaskDelete($this->request);
        $result = $action->execute();

        session()->flash('notification-status', $result['status']);
        session()->flash('notification-msg', $result['message']);

        return $result['success'] ? redirect()->route('portal.tasks.index') : redirect()->back();
    }
}