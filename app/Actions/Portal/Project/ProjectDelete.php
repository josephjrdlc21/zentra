<?php

namespace App\Actions\Portal\Project;

use App\Models\Project;

use App\Events\AuditTrailLogged;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ProjectDelete{
    private array $request = [];

    public function __construct(array $request = []) {
        $this->request = $request;
    }

    public function execute(): array {
        $project = Project::find($this->request['id']);

        if(!$project){
            return [
                'success' => false, 
                'status' => "failed", 
                'message' => "Record not found."
            ];
        }

        DB::beginTransaction();
        try {
            $project->delete();

            event(new AuditTrailLogged(
                process: 'DELETE_PROJECT',
                remarks: 'Deleted a project.',
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
            'message' => "Project has been deleted successfully."
        ];
    }
}