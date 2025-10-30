<?php

namespace App\Http\Controllers\Portal;

use App\Actions\Portal\User\UserList;
use App\Actions\Portal\User\UserCreate;
use App\Actions\Portal\User\UserUpdate;
use App\Actions\Portal\User\UserUpdateStatus;
use App\Actions\Portal\User\UserUpdatePassword;
use App\Actions\Portal\User\UserDelete;

use App\Http\Requests\PageRequest;
use App\Http\Requests\Portal\UserRequest;

use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Str;

use Inertia\Response;
use Carbon\Carbon;

class UserController extends Controller{
    protected array $data = [];
    protected array $request = [];
    protected ?int $per_page;

    public function __construct(){
        parent::__construct();
        array_merge($this->data?:[], parent::get_data());
        $this->data['page_title'] .= "User";
        $this->per_page = env("DEFAULT_PER_PAGE", 10);
    }

    public function index(PageRequest $request): Response {
        $this->data['page_title'] .= " - List";
        $this->data['keyword'] = Str::lower($request->get('keyword'));

        $action = new UserList($this->data, $this->per_page);
        $result = $action->execute();

        $this->data['record'] = $result['record'];

        return inertia('portal/users/index', ['values' => $this->data]);
    }

    public function create(PageRequest $request): Response {
        $this->data['page_title'] .= " - Create";
        $this->data['roles'] = \App\Models\UserRole::whereNotIn('name', ['super admin'])->get();

        return inertia('portal/users/create', ['values' => $this->data]);
    }

    public function store(UserRequest $request): RedirectResponse {
        $this->request['name'] = $request->input('name');
        $this->request['email'] = $request->input('email');
        $this->request['role'] = $request->input('role');

        $action = new UserCreate($this->request);
        $result = $action->execute();

        session()->flash('notification-status', $result['status']);
        session()->flash('notification-msg', $result['message']);

        return $result['success'] ? redirect()->route('portal.users.index') : redirect()->back();
    }

    public function edit(PageRequest $request, ?int $id = null): Response|RedirectResponse {
        $this->data['page_title'] .= " - Edit User";
        $this->data['user'] = \App\Models\User::with('roles')->find($id);
        $this->data['roles'] = \App\Models\UserRole::whereNotIn('name', ['super admin'])->get();

        if(!$this->data['user']){
            session()->flash('notification-status', 'failed');
            session()->flash('notification-msg', "Record not found.");

            return redirect()->route('portal.users.index');
        }

        return inertia('portal/users/edit', ['values' => $this->data]);
    }

    public function update(UserRequest $request, ?int $id = null): RedirectResponse {
        $this->request['id'] = $id;
        $this->request['name'] = $request->input('name');
        $this->request['email'] = $request->input('email');
        $this->request['role'] = $request->input('role');

        $action = new UserUpdate($this->request);
        $result = $action->execute();

        session()->flash('notification-status', $result['status']);
        session()->flash('notification-msg', $result['message']);

        return $result['success'] ? redirect()->route('portal.users.index') : redirect()->back();
    }

    public function update_status(PageRequest $request, ?int $id = null): RedirectResponse {
        $this->request['id'] = $id;
        
        $action = new UserUpdateStatus($this->request);
        $result = $action->execute();

        session()->flash('notification-status', $result['status']);
        session()->flash('notification-msg', $result['message']);

        return $result['success'] ? redirect()->route('portal.users.index') : redirect()->back();
    }

    public function update_password(PageRequest $request, ?int $id = null): RedirectResponse {
        $this->request['id'] = $id;
        
        $action = new UserUpdatePassword($this->request);
        $result = $action->execute();

        session()->flash('notification-status', $result['status']);
        session()->flash('notification-msg', $result['message']);

        return $result['success'] ? redirect()->route('portal.users.index') : redirect()->back();
    }

    public function show(PageRequest $request, ?int $id = null): Response|RedirectResponse {
        $this->data['page_title'] .= " - Show User";

        $this->data['user'] = \App\Models\User::with('roles')->find($id);

        if(!$this->data['user']){
            session()->flash('notification-status', 'failed');
            session()->flash('notification-msg', "Record not found.");

            return redirect()->route('portal.users.index');
        }

        return inertia('portal/users/show', ['values' => $this->data]);
    }

    public function destroy(PageRequest $request, ?int $id = null): RedirectResponse {
        $this->request['id'] = $id;
        
        $action = new UserDelete($this->request);
        $result = $action->execute();

        session()->flash('notification-status', $result['status']);
        session()->flash('notification-msg', $result['message']);

        return $result['success'] ? redirect()->route('portal.users.index') : redirect()->back();
    }
}