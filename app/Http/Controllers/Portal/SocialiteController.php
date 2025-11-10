<?php

namespace App\Http\Controllers\Portal;

use App\Actions\Portal\Socialite\SocialiteCallback;

use App\Http\Requests\PageRequest;

use Illuminate\Http\RedirectResponse;
use Laravel\Socialite\Socialite;

class SocialiteController extends Controller{
    protected array $data = [];
    protected array $request = [];
    protected ?string $guard;

    public function __construct(){
        parent::__construct();
        array_merge($this->data?:[], parent::get_data());
        $this->data['page_title'] .= "Auth";
        $this->guard = "portal";
    }

    public function google_login(PageRequest $request) : RedirectResponse {

        return Socialite::driver('google')->redirect();
    }

    public function google_callback(PageRequest $request) : RedirectResponse {
        $this->request['google'] = Socialite::driver('google')->user();
        
        $action = new SocialiteCallback($this->request);
        $result = $action->execute();

        session()->flash('notification-status', $result['status']);
        session()->flash('notification-msg', $result['message']);

        return $result['success'] ? redirect()->route('portal.index') : redirect()->route('portal.auth.login');
    }
}