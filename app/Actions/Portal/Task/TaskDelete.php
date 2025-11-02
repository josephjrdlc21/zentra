<?php

namespace App\Actions\Portal\Task;

use App\Models\Task;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class TaskDelete{
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
            $task->delete();

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
            'message' => "Task has been deleted successfully."
        ];
    }
}