<?php

namespace App\Actions\Portal\Auth;

use App\Models\User;
use App\Models\UserRole;
use App\Models\UserVerification;

use App\Events\UserRegisterAccount;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

use Carbon\Carbon;
class AuthRegister{
    private array $request = [];

    public function __construct(array $request = []) {
        $this->request = $request;
    }

    public function execute(): array {
        DB::beginTransaction();
        try {
            $user = new User;
            $user->name = Str::title($this->request['name']);
            $user->email = Str::lower($this->request['email']);
            $user->password = bcrypt($this->request['password']);
            $user->status = "active";
            $user->save();

            $role = UserRole::where('name', $this->request['type'])->where('guard_name','portal')->first();
            $user->assignRole($role);

            $user_verification = new UserVerification;
            $user_verification->user_id = $user->id;
            $user_verification->email = $user->email;
            $user_verification->code = str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT);
            $user_verification->token = Str::random(60);
            $user_verification->expires_at = Carbon::now()->addMinutes(5);
            $user_verification->save();

            if(env('MAIL_SERVICE', false)){
                $link = route('portal.auth.verify', $user_verification->token);

                event(new UserRegisterAccount($user_verification, $link));
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
            'status'  => "info", 
            'message' => "
                            Your account has been created successfully.
                            A verification email has been sent to your address. Please verify your account.
                            If you didn’t receive the email, please contact your administrator.
                        "
        ];
    }
}