<?php

namespace App\Actions\Portal\User;

use App\Models\User;
use App\Models\UserRole;

use App\Events\AuditTrailLogged;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class UserUpdate{
    private array $request = [];

    public function __construct(
        array $request = [],
    ) {
        $this->request = $request;
    }

    public function execute(): array {
        $user = User::find($this->request['id']);

        if(!$user){
            return ['success' => false, 'status' => "failed", 'message' => "Record not found."];
        }

        DB::beginTransaction();
        try {
            $user->name = Str::title($this->request['name']);
            $user->email = Str::lower($this->request['email']);
            $user->save();

            $role = UserRole::where('name', $this->request['role'])->where('guard_name','portal')->first();
            $user->syncRoles($role);

            event(new AuditTrailLogged(
                process: 'UPDATE_USER',
                remarks: 'Updated a user details.',
                type: 'USER_ACTION',
            ));

            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();

            return [
                'success' => false, 
                'status' => "failed", 'message' => 
                "Server Error: Code #{$e->getLine()}."
            ];
        }

        return [
            'success' => true, 
            'status'  => "success", 
            'message' => "User details has been updated."
        ];
    }
}