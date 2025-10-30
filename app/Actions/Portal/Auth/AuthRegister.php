<?php

namespace App\Actions\Portal\Auth;

use App\Models\User;
use App\Models\UserRole;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

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
                            A verification email has been sent to your address. Please check your inbox (and spam folder) to verify your account.
                            If you didn’t receive the email, please contact your administrator.
                        "
        ];
    }
}