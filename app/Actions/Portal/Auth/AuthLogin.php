<?php

namespace App\Actions\Portal\Auth;

use App\Events\AuditTrailLogged;

use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;

class AuthLogin{
    private array $request = [];

    public function __construct(array $request = [],) {
        $this->request = $request;
    }

    public function execute(): array {
        if(Auth::guard($this->request['guard'])->attempt(['email' => Str::lower($this->request['email']), 'password' => $this->request['password']])){
            $account = Auth::guard($this->request['guard'])->user();

            event(new AuditTrailLogged(
                process: 'LOGIN_AUTHENTICATION',
                remarks: 'Logged in to the system.',
                type: 'USER_ACTION',
            ));

            if(!$account->email_verified_at) {
                Auth::guard($this->request['guard'])->logout();

                return [
                    'success' => false, 
                    'status'  => "failed", 
                    'message' => "Account is not verfied. Please contact the administrator."
                ];
            }

            if($account->status == "inactive") {
                Auth::guard($this->request['guard'])->logout();

                return [
                    'success' => false, 
                    'status'  => "warning", 
                    'message' => "Account is inactive!"
                ];
            }

            return [
                'success' => true, 
                'status'  => "success", 
                'message' => "Welcome {$account->name}!"
            ];
        }

        return [
            'success' => false, 
            'status'  => "failed", 
            'message' => "Invalid account credentials."
        ];
    }
}