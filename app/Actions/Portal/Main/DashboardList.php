<?php

namespace App\Actions\Portal\Main;

use App\Models\Task;

class DashboardList{

    public function __construct() {
       
    }

    public function execute(): array {
        $record = [
            'pending_tasks' => Task::where('status', 'pending')->count(),
            'completed_tasks' => Task::where('status', 'completed')->count(),
            'in_progress_tasks' => Task::where('status', 'in_progress')->count(),
            'total_tasks' => Task::count(),
            'latest_tasks' => Task::with('assigned')->latest()->take(9)->get(),
        ];

        return ['record' => $record];
    }
}