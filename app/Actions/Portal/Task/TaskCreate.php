<?php

namespace App\Actions\Portal\Task;

use App\Models\Task;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class TaskCreate{
    private array $request = [];

    public function __construct(array $request = []) {
        $this->request = $request;
    }

    public function execute(): array {
        DB::beginTransaction();
        try {
            $task = new Task;
            $task->name = Str::title($this->request['name']);
            $task->start_date = $this->request['start_date'];
            $task->end_date = $this->request['due_date'];
            $task->project_id = $this->request['project'];
            $task->priority = $this->request['priority'];
            $task->assigned_id = $this->request['assigned_to'];
            $task->status = "pending"; /* pending, in progress, on hold, completed, cancelled  */
            $task->save();
            
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
            'message' => "New task has been successfully created."
        ];
    }
}