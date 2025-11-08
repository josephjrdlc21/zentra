<?php

namespace App\Http\Controllers\Portal;

use App\Actions\Portal\Auth\AuthLogin;
use App\Actions\Portal\Auth\AuthLogout;
use App\Actions\Portal\Auth\AuthRegister;
use App\Actions\Portal\Auth\AuthVerify;
use App\Actions\Portal\Auth\AuthForgotPassword;
use App\Actions\Portal\Auth\AuthPassword;

use App\Http\Requests\PageRequest;
use App\Http\Requests\Portal\AuthRequest;

use Illuminate\Http\RedirectResponse;
use Inertia\Response;
use Carbon\Carbon;

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
        $this->data['roles'] = \App\Models\UserRole::whereIn('name', ['project manager', 'member'])->get();

        return inertia('portal/auth/register', ['values' => $this->data]);
    }

    public function store(AuthRequest $request): RedirectResponse {
        $this->request['name'] = $request->input('name');
        $this->request['email'] = $request->input('email');
        $this->request['password'] = $request->input('password');
        $this->request['type'] = $request->input('type');

        $action = new AuthRegister($this->request);
        $result = $action->execute();

        session()->flash('notification-status', $result['status']);
        session()->flash('notification-msg', $result['message']);

        return $result['success'] ? redirect()->route('portal.auth.login') : redirect()->back();
    }

    public function login(PageRequest $request): Response {
        $this->data['page_title'] .= " - Login";

        return inertia('portal/auth/login', ['values' => $this->data]);
    }

    public function verify(PageRequest $request, ?string $token = null): Response|RedirectResponse {
        $this->data['page_title'] .= " - Verify";

        $this->data['verify'] = \App\Models\UserVerification::where('token', $token)->first();

        if(!$this->data['verify']) {
            session()->flash('notification-status', 'failed');
            session()->flash('notification-msg', "Invalid token to verify account.");

            return redirect()->route('portal.auth.login');
        }

        if($this->data['verify']->expires_at->isPast()) {
            $this->data['verify']->delete();

            session()->flash('notification-status', 'failed');
            session()->flash('notification-msg', "Verification has been expired. Contact administrator.");

            return redirect()->route('portal.auth.login');
        }

        return inertia('portal/auth/verify', ['values' => $this->data]);
    }

    public function store_verify(PageRequest $request, ?string $token = null): RedirectResponse {
        $this->request['token'] = $token;
        $this->request['code'] = $request->input('code');

        $action = new AuthVerify($this->request);
        $result = $action->execute();

        session()->flash('notification-status', $result['status']);
        session()->flash('notification-msg', $result['message']);

        return $result['success'] ? redirect()->route('portal.index') : redirect()->back();
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

    public function forgot_password(PageRequest $request): Response {
        $this->data['page_title'] .= " - Forgot Password";

        return inertia('portal/auth/forgot-password', ['values' => $this->data]);
    }

    public function store_forgot_password(PageRequest $request): RedirectResponse {
        $this->request['email'] = $request->input('email');

        $action = new AuthForgotPassword($this->request);
        $result = $action->execute();

        session()->flash('notification-status', $result['status']);
        session()->flash('notification-msg', $result['message']);

        return $result['success'] ? redirect()->route('portal.auth.login') : redirect()->back();
    }

    public function password(PageRequest $request, ?string $token = null): Response|RedirectResponse {
        $this->data['page_title'] .= " - Password";

        $this->data['password'] = \App\Models\ForgotPassword::where('token', $token)->first();

        if(!$this->data['password']) {
            session()->flash('notification-status', 'failed');
            session()->flash('notification-msg', "Invalid token.");

            return redirect()->route('portal.auth.login');
        }

        if($this->data['password']->expires_at->isPast()) {
            \App\Models\ForgotPassword::where('token', $token)->delete();

            session()->flash('notification-status', 'failed');
            session()->flash('notification-msg', "Password reset has been expired. Please try again.");

            return redirect()->route('portal.auth.login');
        }

        return inertia('portal/auth/password', ['values' => $this->data]);
    }

    public function store_password(AuthRequest $request, ?string $token = null): RedirectResponse {
        $this->request['token'] = $token;
        $this->request['password'] = $request->input('password');

        $action = new AuthPassword($this->request);
        $result = $action->execute();

        session()->flash('notification-status', $result['status']);
        session()->flash('notification-msg', $result['message']);

        return $result['success'] ? redirect()->route('portal.index') : redirect()->back();
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