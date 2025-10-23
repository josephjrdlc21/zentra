<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\UserPermission;

class UserPermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissions = [
            ['name' => "portal.users.index", 'description' => "Members List", 'module' => "team_members", 'module_name' => "Team Members", 'guard_name' => "portal"],
            ['name' => "portal.users.create", 'description' => "Create Member", 'module' => "team_members", 'module_name' => "Team Members", 'guard_name' => "portal"],
            ['name' => "portal.users.update", 'description' => "Update Member", 'module' => "team_members", 'module_name' => "Team Members", 'guard_name' => "portal"],
            ['name' => "portal.users.view", 'description' => "View Member", 'module' => "team_members", 'module_name' => "Team Members", 'guard_name' => "portal"],
            ['name' => "portal.users.update_password", 'description' => "Update Member Password", 'module' => "team_members", 'module_name' => "Team Members", 'guard_name' => "portal"],
            ['name' => "portal.users.update_status", 'description' => "Update Member Status", 'module' => "team_members", 'module_name' => "Team Members", 'guard_name' => "portal"],
            ['name' => "portal.users.delete", 'description' => "Delete Member", 'module' => "team_members", 'module_name' => "Team Members", 'guard_name' => "portal"],

            ['name' => "portal.projects.index", 'description' => "Projects List", 'module' => "projects", 'module_name' => "Projects", 'guard_name' => "portal"],
            ['name' => "portal.projects.create", 'description' => "Create Project", 'module' => "projects", 'module_name' => "Projects", 'guard_name' => "portal"],
            ['name' => "portal.projects.update", 'description' => "Update Project", 'module' => "projects", 'module_name' => "Projects", 'guard_name' => "portal"],
            ['name' => "portal.projects.view", 'description' => "View Project", 'module' => "projects", 'module_name' => "Projects", 'guard_name' => "portal"],
            ['name' => "portal.projects.delete", 'description' => "Delete Project", 'module' => "projects", 'module_name' => "Projects", 'guard_name' => "portal"],

            ['name' => "portal.reports.index", 'description' => "Reports List", 'module' => "reports", 'module_name' => "Reports", 'guard_name' => "portal"],
            ['name' => "portal.reports.export", 'description' => "Export Report", 'module' => "reports", 'module_name' => "Reports", 'guard_name' => "portal"],

            ['name' => "portal.activity_logs.index", 'description' => "Activity Logs List", 'module' => "activity_logs", 'module_name' => "Activity Logs", 'guard_name' => "portal"],

            ['name' => "portal.tasks.index", 'description' => "Tasks List", 'module' => "tasks", 'module_name' => "Tasks", 'guard_name' => "portal"],  
            ['name' => "portal.tasks.board", 'description' => "Tasks Board", 'module' => "tasks", 'module_name' => "Tasks", 'guard_name' => "portal"],
            ['name' => "portal.tasks.create", 'description' => "Create Task", 'module' => "tasks", 'module_name' => "Tasks", 'guard_name' => "portal"],
            ['name' => "portal.tasks.update", 'description' => "Update Task", 'module' => "tasks", 'module_name' => "Tasks", 'guard_name' => "portal"],
            ['name' => "portal.tasks.view", 'description' => "View Task", 'module' => "tasks", 'module_name' => "Tasks", 'guard_name' => "portal"],   
            ['name' => "portal.tasks.update_status", 'description' => "Update Task Status", 'module' => "tasks", 'module_name' => "Tasks", 'guard_name' => "portal"],
            ['name' => "portal.tasks.delete", 'description' => "Delete Task", 'module' => "tasks", 'module_name' => "Tasks", 'guard_name' => "portal"], 
            
            ['name' => "portal.roles.index", 'description' => "Roles List", 'module' => "roles", 'module_name' => "Roles", 'guard_name' => "portal"],
            ['name' => "portal.roles.create", 'description' => "Create Role", 'module' => "roles", 'module_name' => "Roles", 'guard_name' => "portal"],
            ['name' => "portal.roles.update", 'description' => "Update Role", 'module' => "roles", 'module_name' => "Roles", 'guard_name' => "portal"],

            ['name' => "portal.permissions.index", 'description' => "Permissions List", 'module' => "permissions", 'module_name' => "Permissions", 'guard_name' => "portal"],
        ];

        foreach($permissions as $permission){
            UserPermission::firstOrCreate(
                ['name' => $permission['name'], 'guard_name' => $permission['guard_name']], $permission
            );
        }
    }
}
