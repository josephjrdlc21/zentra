<?php

namespace App\Actions\Portal\Auth;

use App\Models\User;
use App\Models\UserVerification;

use App\Events\AuditTrailLogged;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

use Carbon\Carbon;

class AuthVerify{
    private array $request = [];

    public function __construct(array $request = []) {
        $this->request = $request;
    }

    public function execute(): array {
        $verify = UserVerification::where('token', $this->request['token'])->where('code', $this->request['code'])->first();

        if(!$verify){
            return [
                'success' => false, 
                'status' => "failed", 
                'message' => "Invalid verification code. Please check your code or contact the administrator."
            ];
        }

        if($verify->expires_at->isPast()){
            $verify->delete();

            return [
                'success' => false, 
                'status' => "failed", 
                'message' => "Expired verification code. Please contact the administrator."
            ];
        }

        DB::beginTransaction();
        try {
            $verify->verified_at = Carbon::now();
            $verify->save();

            $user = User::find($verify->user_id);
            $user->email_verified_at = $verify->verified_at;
            $user->save();

            $verify->delete();

            event(new AuditTrailLogged(
                process: 'VERIFY_AUTHENTICATION',
                remarks: 'Verified a user account.',
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
            'message' => "Your account has been successfully verified.",
        ];
    }
}