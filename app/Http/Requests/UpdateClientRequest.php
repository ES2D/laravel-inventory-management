<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateClientRequest extends FormRequest
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
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:150',

            'document' => [
                'required',
                'string',
                'max:30',
                Rule::unique('clients')->ignore($this->client),
            ],

            'email' => [
                'nullable',
                'email',
                'max:255',
                Rule::unique('clients')->ignore($this->client),
            ],

            'phone' => 'nullable|string|max:20',

            'is_active' => 'boolean',
        ];
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'is_active' => $this->boolean('is_active'),
        ]);
    }
}
