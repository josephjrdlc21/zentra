<?php

namespace App\Actions\Portal\Auth;

use App\Models\User;
use App\Models\ForgotPassword;

use App\Events\AuditTrailLogged;
use App\Events\UserForgotPassword;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

use Carbon\Carbon;

class AuthForgotPassword{
    private array $request = [];

    public function __construct(array $request = []) {
        $this->request = $request;
    }

    public function execute(): array {
        $user = User::where('email', Str::lower($this->request['email']))->where('status', 'active')->first();

        if(!$user){
            return [
                'success' => false, 
                'status' => "failed", 
                'message' => "Invalid email address. Please use your active registered email."
            ];
        }

        if($user){
            $reset = ForgotPassword::where('email', $user->email)->first();

            if ($reset && $reset->expires_at->isFuture()) {
                return [
                    'success' => false,
                    'status' => "failed",
                    'message' => "You still have an active password reset request. Please check your email and try again after 10 minutes."
                ];
            }

            if ($reset && $reset->expires_at->isPast()) {
                $reset->delete();
            }
        }
        
        DB::beginTransaction();
        try {
            $forgot_password = new ForgotPassword;
            $forgot_password->email = $user->email;
            $forgot_password->token = Str::random(60);
            $forgot_password->expires_at = Carbon::now()->addMinutes(5);
            $forgot_password->created_at = Carbon::now();
            $forgot_password->save();

            event(new AuditTrailLogged(
                process: 'FORGOT_PASSWORD_AUTHENTICATION',
                remarks: 'Forgot a password user.',
                type: 'USER_ACTION',
            ));

            if(env('MAIL_SERVICE', false)){
                $link = route('portal.auth.password', $forgot_password->token);

                event(new UserForgotPassword($user, $link));
            }

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
            'message' => "A link has been sent your email address.",
        ];
    }
}