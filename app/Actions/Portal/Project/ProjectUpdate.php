<?php

namespace App\Actions\Portal\Project;

use App\Models\Project;
use App\Models\ProjectUser;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ProjectUpdate{
    private array $request = [];

    public function __construct(array $request = []) {
        $this->request = $request;
    }

    public function execute(): array {
        $project = Project::find($this->request['id']);

        if(!$project){
            return ['success' => false, 'status' => "failed", 'message' => "Record not found."];
        }

        DB::beginTransaction();
        try {
            $project->name = Str::title($this->request['name']);
            $project->due_date = $this->request['due_date'];
            $project->lead_id = $this->request['owner'];
            //$project->status = "pending"; /* pending, in progress, on hold, completed, cancelled  */
            $project->description = $this->request['description'];
            $project->save();

            $project->members()->sync($this->request['members']);
            
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
            'message' => "Project details has been updated."
        ];
    }
}