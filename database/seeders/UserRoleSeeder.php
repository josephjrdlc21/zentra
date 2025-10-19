<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\UserRole;

class UserRoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = [
            'super admin',
            'admin',
            'project manager',
            'member',
        ];

        foreach ($roles as $role) {
            UserRole::firstOrCreate(['name' => $role, 'guard_name' => 'portal']);
        }
    }
}
