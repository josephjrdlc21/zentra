<?php

namespace Database\Seeders\AccessRole;

use App\Models\UserRole;

use Illuminate\Database\Seeder;

class SuperAdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $role = UserRole::where('name', 'super admin')->first();
        $role->givePermissionTo([
            'portal.users.index', 'portal.users.create', 'portal.users.update', 'portal.users.view', 'portal.users.update_password', 'portal.users.update_status', 'portal.users.delete',
            'portal.projects.index', 'portal.projects.create', 'portal.projects.update', 'portal.projects.view', 'portal.projects.delete',
            'portal.reports.index', 'portal.reports.export',
            'portal.tasks.index', 'portal.tasks.create', 'portal.tasks.update', 'portal.tasks.view', 'portal.tasks.update_status', 'portal.tasks.board', 'portal.tasks.delete',
            'portal.activity_logs.index',
            'portal.roles.index', 'portal.roles.create', 'portal.roles.update',
            'portal.permissions.index',
        ]);
    }
}