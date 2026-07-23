<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateProductRequest extends FormRequest
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

            'category_id' => [
                'required',
                'exists:categories,id',
            ],

            'sku' => [
                'required',
                'max:50',
                Rule::unique('products', 'sku')->ignore($this->product),
            ],

            'barcode' => [
                'nullable',
                'max:100',
                Rule::unique('products', 'barcode')->ignore($this->product),
            ],

            'name' => [
                'required',
                'max:150',
            ],

            'description' => [
                'nullable',
            ],

            'unit' => [
                'required',
                'max:20',
            ],

            'purchase_price' => [
                'required',
                'numeric',
                'min:0',
            ],

            'sale_price' => [
                'required',
                'numeric',
                'gte:purchase_price',
            ],

            'minimum_stock' => [
                'required',
                'integer',
                'min:0',
            ],

            'image' => [
                'nullable',
                'string',
            ],

            'is_active' => [
                'boolean',
            ],

        ];
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'is_active' => $this->boolean('is_active'),
        ]);
    }
}
