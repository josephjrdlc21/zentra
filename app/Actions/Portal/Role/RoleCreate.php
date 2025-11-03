<?php

namespace App\Actions\Portal\Role;

use App\Models\UserRole;

use App\Events\AuditTrailLogged;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class RoleCreate{
    private array $request = [];

    public function __construct(array $request = []) {
        $this->request = $request;
    }

    public function execute(): array {
        DB::beginTransaction();
        try {
            $role = new UserRole;
            $role->guard_name = 'portal';
            $role->name = Str::lower($this->request['role']);
            $role->save();

            $role->givePermissionTo($this->request['permissions']);

            event(new AuditTrailLogged(
                process: 'CREATE_ROLE',
                remarks: 'Created a new role.',
                type: 'USER_ACTION',
            ));
            
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
            'message' => "New role has been successfully created. You can now assign this to a user."
        ];
    }
}