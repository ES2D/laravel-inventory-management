<?php

namespace App\Http\Requests;


use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest
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

            'category_id' => [
                'required',
                'exists:categories,id'
            ],

            'sku' => [
                'required',
                'max:50',
                'unique:products,sku'
            ],

            'barcode' => [
                'nullable',
                'max:100',
                'unique:products,barcode'
            ],

            'name' => [
                'required',
                'max:150'
            ],

            'description' => [
                'nullable'
            ],

            'unit' => [
                'required',
                'max:20'
            ],

            'purchase_price' => [
                'required',
                'numeric',
                'min:0'
            ],

            'sale_price' => [
                'required',
                'numeric',
                'gte:purchase_price'
            ],

            'minimum_stock' => [
                'required',
                'integer',
                'min:0'
            ],

            'image' => [
                'nullable',
                'string'
            ],

            'is_active' => [
                'boolean'
            ],

        ];
    }

    public function messages(): array
    {
        return [

            'category_id.required' => 'Debe seleccionar una categoría.',

            'category_id.exists' => 'La categoría seleccionada no existe.',

            'sku.required' => 'El SKU es obligatorio.',

            'sku.unique' => 'El SKU ya está registrado.',

            'name.required' => 'El nombre del producto es obligatorio.',

            'purchase_price.required' => 'Debe ingresar el precio de compra.',

            'sale_price.required' => 'Debe ingresar el precio de venta.',

            'sale_price.gte' => 'El precio de venta no puede ser menor al precio de compra.',

            'minimum_stock.required' => 'Debe indicar el stock mínimo.',

            'unit.required' => 'Debe indicar la unidad de medida.',

        ];
    }

    public function attributes(): array
    {
        return [

            'category_id' => 'categoría',
            'sku' => 'SKU',
            'barcode' => 'código de barras',
            'name' => 'nombre',
            'purchase_price' => 'precio de compra',
            'sale_price' => 'precio de venta',
            'minimum_stock' => 'stock mínimo',
            'unit' => 'unidad',
            'current_stock' => [
                'required',
                'integer',
                'min:0',
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
