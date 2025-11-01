<?php

namespace App\Http\Requests\Portal;

use App\Http\Requests\RequestManager;

class ProfileRequest extends RequestManager
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(): array
    {
        $id = auth('portal')->user()->id;

        $rules = [];

        switch ($this->route()->getName()) {
            case 'portal.profile.update_pass':
                $rules = [
                    'current_password' => "required|current_password:{$id}",
                    'password' => "required|confirmed|password_format|new_password:{$id}",
                ];

                break;

            case 'portal.profile.update_profile':
                $rules = [
                    'profile_picture' => "required|mimes:png,jpg,jpeg|min:1|max:2048",
                ];

                break;
        }

        return $rules;
    }

    public function messages(): array
    {
        return [
            'required' => "Field is required.",
            'confirmed' => "Password mismatch.",
            'current_password.current_password' => 'The password is incorrect.',
            'password_format' => "Password must be atleast 8 characters long, should contain atleast 1 uppercase, 1 lowercase, 1 numeric and 1 special character.",
            'password.new_password' => "You are not allowed to use the same password.",
            'image.min' => "The file must be at least 1 KB.",
            'image.max' => "The file may not be greater than 2 MB.",
        ];
    }
}