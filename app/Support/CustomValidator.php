<?php

namespace App\Support;

use App\Models\User;
use App\Models\ProjectUser;

use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Validator;
use Propaganistas\LaravelPhone\PhoneNumber;
use Carbon\Carbon;

class CustomValidator extends Validator {
    
    public function validateUniqueEmail($attribute, $value, $parameters)
    {
        $email = strtolower($value);
        $id = (is_array($parameters) and isset($parameters[0])) ? $parameters[0] : "0";
        $type = (is_array($parameters) and isset($parameters[1])) ? $parameters[1] : "user";

        switch (strtolower($type)) {
            case 'user':
                return User::where('email', $email)
                    ->where('id', '<>', $id)
                    ->count() ? false : true;
                break;
            default:
                return User::where('email', $email)
                    ->where('id', '<>', $id)
                    ->count() ? false : true;
        }
    }

    public function validateIsMember($attribute, $value, $parameters)
    {
        $assigned_to = strtolower($value);
        $project = (is_array($parameters) and isset($parameters[0])) ? $parameters[0] : "0";

        return ProjectUser::where('project_id', $project)->where('user_id', $assigned_to)->exists();
    }

    public function validatePasswordFormat($attribute, $value, $parameters){
        return preg_match(("/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-.]).{8,}$/"), $value);
    }

    public function validateCurrentPassword($attribute, $value, $parameters){
        if ($parameters) {
            $user_id = (is_array($parameters) and isset($parameters[0])) ? $parameters[0] : "0";
            $user = User::find($user_id);

            return Hash::check($value, $user->password);
        }

        return false;
    }

    public function validateNewPassword($attribute, $value, $parameters){
        $user_id = (is_array($parameters) and isset($parameters[0])) ? $parameters[0] : "0";
        $user = User::find($user_id);

        return !Hash::check($value, $user->password) ? true : false;
    }
}