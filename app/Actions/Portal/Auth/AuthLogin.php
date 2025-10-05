<?php

namespace App\Actions\Portal\Auth;

use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;

class AuthLogin{
    private array $request = [];

    public function __construct(array $request = [],) {
        $this->request = $request;
    }

    public function execute(): array {
        if(Auth::guard($this->request['guard'])->attempt([
            'email' => Str::lower($this->request['email']), 
            'password' => $this->request['password']
        ])){
            $account = Auth::guard($this->request['guard'])->user();

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