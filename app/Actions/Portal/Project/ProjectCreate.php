<?php

namespace App\Actions\Portal\Project;

use App\Models\Project;
use App\Models\ProjectUser;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ProjectCreate{
    private array $request = [];

    public function __construct(array $request = []) {
        $this->request = $request;
    }

    public function execute(): array {
        DB::beginTransaction();
        try {
            $project = new Project;
            $project->name = Str::title($this->request['name']);
            $project->start_date = $this->request['start_date'];
            $project->due_date = $this->request['due_date'];
            $project->lead_id = $this->request['owner'];
            $project->status = "pending"; /* pending, in progress, on hold, completed, cancelled  */
            $project->description = $this->request['description'];
            $project->save();

            $project->members()->sync($this->request['members']);
            
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();

            return [
                'success' => false, 
                'status' => "failed", 
                'message' => "Server Error: Code #{$e->getMessage()}."
            ];
        }

        return [
            'success' => true, 
            'status'  => "success", 
            'message' => "New project has been successfully created. You can now assign a task for this project."
        ];
    }
}