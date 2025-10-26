<?php

namespace App\Http\Requests\Portal;

use App\Http\Requests\RequestManager;

class RoleRequest extends RequestManager
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $id = $this->id ?? 0;

        $rules = [
            'role' => "required|unique:users_roles,name,{$id},id",
            'permissions' => "required|array",
        ];

        return $rules;
    }

    public function messages(): array
    {
        return [
            'required'	=> "Field is required.",
            'permissions.array' => "Please assign at least 1 permission.",
            'permissions.required' => "Please assign at least 1 permission.",
        ];
    }
}
