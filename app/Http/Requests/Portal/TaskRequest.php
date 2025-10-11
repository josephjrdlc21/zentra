<?php

namespace App\Http\Requests\Portal;

use App\Http\Requests\RequestManager;

class TaskRequest extends RequestManager
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
        $project = $this->input('project');

        $rules = [
            'name' => 'required|max:40',
            'start_date' => 'required|date',
            'due_date' => 'required|date|after_or_equal:start_date',
            'project' => 'required',
            'priority' => 'required',
            'assigned_to' => "required|is_member:{$project}",
        ];

        if($id > 0) {
            $rules['start_date'] = 'nullable|date';
        }

        return $rules;
    }

    public function messages(): array
    {
        return [
            'required' => "Field is required.",
            'max' => "Character inputs is too long.",
            'is_member' => "You are not a member of this project. Unable to create task for this project."
        ];
    }
}
