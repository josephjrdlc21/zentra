<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use Database\Seeders\UserRoleSeeder;
use Database\Seeders\UserPermissionSeeder;
use Database\Seeders\UserAccessRoleSeeder;

class InitializeRoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->call([
            UserRoleSeeder::class,
            UserPermissionSeeder::class,
            UserAccessRoleSeeder::class,
        ]);
    }
}
