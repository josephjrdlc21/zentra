<?php

namespace App\Http\Controllers\Portal;

use App\Actions\Portal\Role\RoleList;
use App\Actions\Portal\Role\RoleCreate;
use App\Actions\Portal\Role\RoleUpdate;

use App\Http\Requests\PageRequest;
use App\Http\Requests\Portal\RoleRequest;

use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Str;

use Inertia\Response;
use Carbon\Carbon;

class RoleController extends Controller{
    protected array $data = [];
    protected array $request = [];
    protected ?int $per_page;

    public function __construct(){
        parent::__construct();
        array_merge($this->data?:[], parent::get_data());
        $this->data['page_title'] .= "Role";
        $this->per_page = env("DEFAULT_PER_PAGE", 10);
    }

    public function index(PageRequest $request): Response {
        $this->data['page_title'] .= " - List";
        $this->data['keyword'] = Str::lower($request->get('keyword'));

        $action = new RoleList($this->data, $this->per_page);
        $result = $action->execute();

        $this->data['record'] = $result['record'];

        return inertia('portal/roles/index', ['values' => $this->data]);
    }

    public function create(PageRequest $request): Response {
        $this->data['page_title'] .= " - Create";
        $this->data['permissions'] = \App\Models\UserPermission::select('id', 'name', 'description')->orderBy('description', 'asc')->get();

        return inertia('portal/roles/create', ['values' => $this->data]);
    }

    public function store(RoleRequest $request): RedirectResponse {
        $this->request['role'] = $request->input('role');
        $this->request['permissions'] = $request->input('permissions');

        $action = new RoleCreate($this->request);
        $result = $action->execute();

        session()->flash('notification-status', $result['status']);
        session()->flash('notification-msg', $result['message']);

        return $result['success'] ? redirect()->route('portal.roles.index') : redirect()->back();
    }

    public function edit(PageRequest $request, ?int $id = null): Response|RedirectResponse {
        $this->data['page_title'] .= " - Edit Projet";
        $this->data['permissions'] = \App\Models\UserPermission::select('id', 'name', 'description')->orderBy('description', 'asc')->get();
        $this->data['role'] = \App\Models\UserRole::with('permissions')->find($id);

        if(!$this->data['role']){
            session()->flash('notification-status', 'failed');
            session()->flash('notification-msg', "Record not found.");

            return redirect()->route('portal.roles.index');
        }

        return inertia('portal/roles/edit', ['values' => $this->data]);
    }

    public function update(RoleRequest $request, ?int $id = null): RedirectResponse {
        $this->request['id'] = $id;
        $this->request['role'] = $request->input('role');
        $this->request['permissions'] = $request->input('permissions');

        $action = new RoleUpdate($this->request);
        $result = $action->execute();

        session()->flash('notification-status', $result['status']);
        session()->flash('notification-msg', $result['message']);

        return $result['success'] ? redirect()->route('portal.roles.index') : redirect()->back();
    }
}