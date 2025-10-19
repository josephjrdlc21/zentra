<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use Database\Seeders\AccessRole\SuperAdminSeeder;
use Database\Seeders\AccessRole\AdminSeeder;
use Database\Seeders\AccessRole\ProjectManagerSeeder;
use Database\Seeders\AccessRole\MemberSeeder;

class UserAccessRoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->call([
            SuperAdminSeeder::class,
            AdminSeeder::class,
            ProjectManagerSeeder::class,
            MemberSeeder::class,
        ]);    
    }
}
