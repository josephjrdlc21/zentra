<?php

namespace App\Http\Controllers\Portal;

use App\Actions\Portal\Profile\ProfileUpdatePassword;

use App\Http\Requests\PageRequest;
use App\Http\Requests\Portal\ProfileRequest;

use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

use Inertia\Response;
use Carbon\Carbon;

class ProfileController extends Controller{
    protected array $data = [];
    protected array $request = [];
    protected ?int $id;

    public function __construct(){
        parent::__construct();
        array_merge($this->data?:[], parent::get_data());
        $this->data['page_title'] .= "Profile";
        $this->id = Auth::guard('portal')->id();
    }

    public function index(PageRequest $request, ?int $id = null): Response|RedirectResponse {
        $this->data['page_title'] .= " - Details";

        $this->data['profile'] = \App\Models\User::with('roles')->find($this->id);

        if(!$this->data['profile']){
            session()->flash('notification-status', 'failed');
            session()->flash('notification-msg', "Record not found.");

            return redirect()->route('portal.index');
        }

        return inertia('portal/profile/index', ['values' => $this->data]);
    }

    public function edit_password(PageRequest $request, ?int $id = null): Response|RedirectResponse {
        $this->data['page_title'] .= " - Change Password";

        $this->data['profile'] = \App\Models\User::find($this->id);

        if(!$this->data['profile']){
            session()->flash('notification-status', 'failed');
            session()->flash('notification-msg', "Record not found.");

            return redirect()->route('portal.index');
        }

        return inertia('portal/profile/change-password', ['values' => $this->data]);
    }

    public function update_pass(ProfileRequest $request, ?int $id = null): RedirectResponse {
        $this->request['id'] = $this->id;
        $this->request['password'] = $request->input('password');
       
        $action = new ProfileUpdatePassword($this->request);
        $result = $action->execute();

        session()->flash('notification-status', $result['status']);
        session()->flash('notification-msg', $result['message']);

        return $result['success'] ? redirect()->route('portal.index') : redirect()->back();
    }
}