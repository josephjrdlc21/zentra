<?php

namespace App\Actions\Portal\User;

use App\Models\User;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class UserDelete{
    private array $request = [];

    public function __construct(array $request = []) {
        $this->request = $request;
    }

    public function execute(): array {
        $user = User::find($this->request['id']);

        if(!$user){
            return [
                'success' => false, 
                'status' => "failed", 
                'message' => "Record not found."
            ];
        }

        DB::beginTransaction();
        try {
            $user->delete();

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
            'message' => "User has been deleted successfully."
        ];
    }
}