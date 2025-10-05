<?php

namespace App\Services;

use App\Models\User;

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

}