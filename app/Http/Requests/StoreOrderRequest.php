<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreOrderRequest extends FormRequest
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

            'client_id' => [
                'required',
                'exists:clients,id',
            ],

            'order_date' => [
                'required',
                'date',
            ],

            'products' => [
                'required',
                'array',
                'min:1',
            ],

            'products.*.product_id' => [
                'required',
                'exists:products,id',
            ],

            'products.*.quantity' => [
                'required',
                'integer',
                'min:1',
            ],

        ];
    }

    public function messages(): array
    {
        return [

            'products.required' => 'Debe agregar al menos un producto.',

            'products.min' => 'Debe agregar al menos un producto.',

            'products.*.quantity.min' => 'La cantidad debe ser mayor que cero.',

        ];
    }
}
