<?php

namespace Database\Seeders\AccessRole;

use App\Models\UserRole;

use Illuminate\Database\Seeder;

class MemberSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $role = UserRole::where('name', 'member')->first();
        $role->givePermissionTo([
            'portal.users.index', 'portal.users.view',
            'portal.projects.index', 'portal.projects.view',
            'portal.tasks.index', 'portal.tasks.create', 'portal.tasks.update', 'portal.tasks.view', 'portal.tasks.update_status', 'portal.tasks.board', 'portal.tasks.delete',
        ]);
    }
}