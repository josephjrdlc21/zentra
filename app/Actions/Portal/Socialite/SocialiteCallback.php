<?php

namespace App\Actions\Portal\Socialite;

use App\Models\User;
use App\Models\UserRole;

use App\Events\AuditTrailLogged;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class SocialiteCallback{
    private array $request = [];

    public function __construct(array $request = []) {
        $this->request = $request;
    }       

    public function execute(): array {
        $user = User::where('google_id', $this->request['google']['id'])->first();

        if(!$user){
            $existing_user = User::where('email', $this->request['google']['email'])->first();

            if($existing_user){
                $existing_user->google_id = $this->request['google']['id'];
                $existing_user->save();

                Auth::guard('portal')->login($existing_user);
                $account = Auth::guard('portal')->user();

                event(new AuditTrailLogged(
                    process: 'LOGIN_AUTHENTICATION',
                    remarks: 'Logged in to the system google account.',
                    type: 'USER_ACTION',
                ));

                return [
                    'success' => true, 
                    'status'  => "success", 
                    'message' => "Welcome {$account->name}!"
                ];
            }

            $user = new User;
            $user->name = Str::title($this->request['google']['name']);
            $user->email = $this->request['google']['email'];
            $user->status = "active";
            $user->password = bcrypt(Str::random(8));
            $user->google_id = $this->request['google']['id'];
            $user->save();

            $role = UserRole::where('name', 'member')->where('guard_name','portal')->first();
            $user->assignRole($role);

            Auth::guard('portal')->login($user);
            $account = Auth::guard('portal')->user();

            event(new AuditTrailLogged(
                process: 'LOGIN_AUTHENTICATION',
                remarks: 'Logged in to the system google account.',
                type: 'USER_ACTION',
            ));

            return [
                'success' => true, 
                'status'  => "success", 
                'message' => "Welcome, {$account->name}! Your account has been created with the default 'Member' role. You may request a different role from an administrator if needed.",
            ];
        }

        Auth::guard('portal')->login($user);
        $account = Auth::guard('portal')->user();

        event(new AuditTrailLogged(
            process: 'LOGIN_AUTHENTICATION',
            remarks: 'Logged in to the system google account.',
            type: 'USER_ACTION',
        ));

        return [
            'success' => true, 
            'status'  => "success", 
            'message' => "Welcome {$account->name}!"
        ];
    }
}