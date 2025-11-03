<?php

namespace App\Actions\Portal\Auth;

use App\Events\AuditTrailLogged;

use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;

class AuthLogout{
    private array $request = [];

    public function __construct(array $request = [],) {
        $this->request = $request;
    }

    public function execute(): array {
        event(new AuditTrailLogged(
            process: 'LOGOUT_AUTHENTICATION',
            remarks: 'Logged out to the system.',
            type: 'USER_ACTION',
        ));

        Auth::guard($this->request['guard'])->logout();

        return [
            'success' => true,
            'message' => "Logged out successfully.",
            'status'  => "success",
        ];
    }
}