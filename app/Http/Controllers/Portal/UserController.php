<?php

namespace App\Http\Controllers\Portal;

use App\Actions\Portal\User\UserCreate;

use App\Http\Requests\PageRequest;
use App\Http\Requests\Portal\UserRequest;

use Illuminate\Http\RedirectResponse;
use Inertia\Response;

class UserController extends Controller{
    protected array $data = [];
    protected array $request = [];
    protected ?int $per_page;

    public function __construct(){
        parent::__construct();
        array_merge($this->data?:[], parent::get_data());
        $this->data['page_title'] .= "User";
    }

    public function index(PageRequest $request): Response {
        $this->data['page_title'] .= " - List";

        return inertia('portal/users/index', ['values' => $this->data]);
    }

    public function create(PageRequest $request): Response {
        $this->data['page_title'] .= " - Create";

        return inertia('portal/users/create', ['values' => $this->data]);
    }

      public function store(UserRequest $request): RedirectResponse {
        $this->request['name'] = $request->input('name');
        $this->request['email'] = $request->input('email');

        $action = new UserCreate(
            $this->request
        );

        $result = $action->execute();

        session()->flash('notification-status', $result['status']);
        session()->flash('notification-msg', $result['message']);

        return $result['success'] ? redirect()->route('portal.users.index') : redirect()->back();
    }
}