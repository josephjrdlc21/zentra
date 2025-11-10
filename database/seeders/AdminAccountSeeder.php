<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\User;
use App\Models\UserRole;

class AdminAccountSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::where('email', 'admin@gmail.com')->first();

        if(!$user){
            $account = new User;
            $account->name = "Super Admin";
            $account->status = "active";
            $account->email = "admin@gmail.com";
            $account->password = bcrypt("admin");
            $account->save();

            $role = UserRole::where('name', 'super admin')->where('guard_name','portal')->first();
            $account->assignRole($role);
        }
    }
}
