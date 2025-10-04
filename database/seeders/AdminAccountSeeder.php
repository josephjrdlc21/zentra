<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\User;

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
            $account->name = "Master Admin";
            $account->status = "active";
            $account->email = "admin@gmail.com";
            $account->password = bcrypt("admin");
            $account->save();
        }
    }
}
