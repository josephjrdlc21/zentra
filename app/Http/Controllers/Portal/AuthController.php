<?php

namespace App\Http\Controllers\Portal;

use App\Actions\Portal\Auth\AuthLogin;
use App\Actions\Portal\Auth\AuthLogout;

use App\Http\Requests\PageRequest;

use Illuminate\Http\RedirectResponse;
use Inertia\Response;

class AuthController extends Controller{
    protected array $data = [];
    protected array $request = [];
    protected ?string $guard;

    public function __construct(){
        parent::__construct();
        array_merge($this->data?:[], parent::get_data());
        $this->data['page_title'] .= "Auth";
        $this->guard = "portal";
    }

    public function register(PageRequest $request): Response {
        $this->data['page_title'] .= " - Register";

        return inertia('portal/auth/register', ['values' => $this->data]);
    }

    public function login(PageRequest $request): Response {
        $this->data['page_title'] .= " - Login";

        return inertia('portal/auth/login', ['values' => $this->data]);
    }

    public function authenticate(PageRequest $request): RedirectResponse {
        $this->request['guard'] = $this->guard;
        $this->request['email'] = $request->input('email');
        $this->request['password'] = $request->input('password');

        $action = new AuthLogin(
            $this->request
        );
        $result = $action->execute();

        session()->flash('notification-status', $result['status']);
        session()->flash('notification-msg', $result['message']);
        return $result['success'] ? redirect()->route('portal.index') : redirect()->route('portal.auth.login');
    }

    public function logout(PageRequest $request): RedirectResponse {
        $this->request['guard'] = $this->guard;

        $action = new AuthLogout(
            $this->request
        );
        $result = $action->execute();

        session()->flash('notification-status', $result['status']);
        session()->flash('notification-msg', $result['message']);
        return $result['success'] ? redirect()->route('portal.auth.login') : redirect()->route('portal.index');
    }
}