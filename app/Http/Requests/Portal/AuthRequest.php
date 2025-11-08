<?php

namespace App\Http\Requests\Portal;

use App\Http\Requests\RequestManager;

class AuthRequest extends RequestManager
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
        $id = $this->id ?? 0;

        $rules = [];

        switch ($this->route()->getName()) {
            case 'portal.auth.store':
                $rules = [
                    'name' => "required|max:50",
                    'type' => "required",
                    'email' => "required|email:rfc,dns|unique_email:{$id},user|max:40",
                    'password' => "required|confirmed|password_format",
                ];

                break;

            case 'portal.auth.store_password':
                $rules = [
                    'password' => "required|confirmed|password_format",
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
            'email.email' => "Invalid email address.",
            'email.unique_email' => "Email address is already taken.",
            'max' => "Character inputs is too long.",
            'password_format' => "Password must be atleast 8 characters long, should contain atleast 1 uppercase, 1 lowercase, 1 numeric and 1 special character.",
        ];
    }
}