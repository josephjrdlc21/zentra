<?php

namespace App\Actions\Portal\User;

use App\Models\User;

use App\Events\UserResetPassword;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class UserUpdatePassword{
    private array $request = [];

    public function __construct(array $request = []) {
        $this->request = $request;
    }

    public function execute(): array {
        $user = User::find($this->request['id']);

        if(!$user){
            return [
                'success' => false, 
                'status' => "failed", 
                'message' => "Record not found."
            ];
        }

        DB::beginTransaction();
        try {
            $password = Str::random(8);

            $user->password = bcrypt($password);
            $user->save();

            if(env('MAIL_SERVICE', false)){
                $link = route('portal.auth.login');

                event(new UserResetPassword($user, $password, $link));
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
            'message' => "User password has been reset. New password was sent to email."
        ];
    }
}