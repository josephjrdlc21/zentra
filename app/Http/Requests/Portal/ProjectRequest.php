<?php

namespace App\Http\Requests\Portal;

use App\Http\Requests\RequestManager;

class ProjectRequest extends RequestManager
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
            'name' => 'required|max:40',
            'start_date' => 'required|date',
            'due_date' => 'required|date|after_or_equal:start_date',
            'owner' => 'required',
            'members' => 'required|array|min:1',
            'description' => "required|max:1000",
        ];

        return $rules;
    }

    public function messages(): array
    {
        return [
            'required' => "Field is required.",
            'max' => "Character inputs is too long.",
        ];
    }
}
