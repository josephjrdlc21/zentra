<?php

namespace App\Actions\Portal\Profile;

use App\Models\User;

use App\Events\AuditTrailLogged;

use Illuminate\Support\Facades\DB;
use App\Support\ImageUploader;

class ProfileUpdatePicture{
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
            if($this->request['profile_picture']){
                $profile_picture = ImageUploader::upload($this->request['profile_picture'], "uploads/profile/{$profile->id}");

                $profile->path = $profile_picture['path'];
                $profile->directory = $profile_picture['directory'];
                $profile->filename = $profile_picture['filename'];
                $profile->source = $profile_picture['source'];
                $profile->save();

                event(new AuditTrailLogged(
                    process: 'UPDATE_PICTURE_PROFILE',
                    remarks: 'Updated a profile picture.',
                    type: 'USER_ACTION',
                ));
            }

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
            'message' => "Profile has been successfully changed."
        ];
    }
}