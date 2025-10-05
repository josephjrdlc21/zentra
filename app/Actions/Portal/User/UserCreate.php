<?php

namespace App\Actions\Portal\User;

use App\Models\User;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class UserCreate{
    private array $request = [];

    public function __construct(array $request = []) {
        $this->request = $request;
    }

    public function execute(): array {
        DB::beginTransaction();
        try {
            $password = Str::random(8);

            $user = new User;
            $user->name = Str::title($this->request['name']);
            $user->email = Str::lower($this->request['email']);
            $user->password = bcrypt($password);
            $user->status = "active";
            $user->save();

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
            'message' => "New user has been successfully created. Default password was sent to email."
        ];
    }
}