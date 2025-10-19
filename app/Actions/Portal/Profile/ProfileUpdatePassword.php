<?php

namespace App\Actions\Portal\Profile;

use App\Models\User;

use Illuminate\Support\Facades\DB;

class ProfileUpdatePassword{
    private array $request = [];

    public function __construct(array $request = []) {
        $this->request = $request;
    }

    public function execute(): array {
        $profile = User::find($this->request['id']);

        if(!$profile){
            return [
                'success' => false, 
                'status' => "failed", 
                'message' => "Record not found."
            ];
        }

        DB::beginTransaction();
        try {
            $profile->password = bcrypt($this->request['password']);
            $profile->save();

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
            'message' => "Password has been successfully updated."
        ];
    }
}