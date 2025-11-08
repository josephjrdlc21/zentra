<?php

namespace App\Actions\Portal\Auth;

use App\Models\User;
use App\Models\ForgotPassword;

use App\Events\AuditTrailLogged;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

use Carbon\Carbon;

class AuthPassword{
    private array $request = [];

    public function __construct(array $request = []) {
        $this->request = $request;
    }

    public function execute(): array {
        $reset = ForgotPassword::where('token', $this->request['token'])->first();

        if(!$reset){
            return [
                'success' => false, 
                'status' => "failed", 
                'message' => "Invalid token."
            ];
        }

        if($reset->expires_at->isPast()){
            $reset->delete();

            return [
                'success' => false, 
                'status' => "failed", 
                'message' => "Expired password reset. Please try again after 10 minutes."
            ];
        }

        DB::beginTransaction();
        try {
            $user = User::where('email', $reset->email)->first();
            $user->password = bcrypt($this->request['password']);
            $user->save();

            $reset->delete();

            event(new AuditTrailLogged(
                process: 'NEW_PASSWORD_AUTHENTICATION',
                remarks: 'New user password.',
                type: 'USER_ACTION',
            ));

            Auth::guard('portal')->login($user);

            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();

            return [
                'success' => false, 
                'status' => "failed", 
                'message' => "Server Error: Code #{$e->getLine()}."
            ];
        }

        return [
            'success' => true, 
            'status'  => "success", 
            'message' => "You have successfully change your password.",
        ];
    }
}