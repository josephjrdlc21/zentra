<?php

namespace App\Actions\Portal\Task;

use App\Models\Task;

use App\Events\AuditTrailLogged;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class TaskUpdate{
    private array $request = [];

    public function __construct(array $request = []) {
        $this->request = $request;
    }

    public function execute(): array {
        $task = Task::find($this->request['id']);

        if(!$task){
            return [
                'success' => false, 
                'status' => "failed", 
                'message' => "Record not found."
            ];
        }

        DB::beginTransaction();
        try {
            $task->name = Str::title($this->request['name']);
            $task->end_date = $this->request['due_date'];
            $task->project_id = $this->request['project'];
            $task->priority = $this->request['priority'];
            $task->assigned_id = $this->request['assigned_to'];
            $task->save();

            event(new AuditTrailLogged(
                process: 'UPDATE_TASK',
                remarks: 'Updated a task details.',
                type: 'USER_ACTION',
            ));

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
            'message' => "Task details has been updated."
        ];
    }
}