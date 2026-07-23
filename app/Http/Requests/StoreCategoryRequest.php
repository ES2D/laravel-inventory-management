<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCategoryRequest extends FormRequest
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
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [

            'name' => [
                'required',
                'string',
                'min:3',
                'max:100',
                'unique:categories,name',
            ],

            'description' => [
                'nullable',
                'string',
                'max:500',
            ],

            'is_active' => [
                'boolean',
            ],

        ];
    }

    public function messages(): array
    {
        return [

            'name.required' => 'El nombre de la categoría es obligatorio.',

            'name.unique' => 'Ya existe una categoría con ese nombre.',

            'name.min' => 'El nombre debe tener al menos 3 caracteres.',

            'description.max' => 'La descripción no puede superar los 500 caracteres.',

        ];
    }

    public function attributes(): array
    {
        return [

            'name' => 'nombre',

            'description' => 'descripción',

            'is_active' => 'estado',

        ];
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'is_active' => $this->boolean('is_active'),
        ]);
    }
}
