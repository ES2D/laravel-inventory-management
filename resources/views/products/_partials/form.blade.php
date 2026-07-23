<div class="row">

    <div class="col-md-6 mb-3">

        <label class="form-label">
            Categoría
        </label>

        <select name="category_id" class="form-select @error('category_id') is-invalid @enderror">

            <option value="">Seleccione...</option>

            @foreach ($categories as $category)
                <option value="{{ $category->id }}" @selected(old('category_id', $product->category_id ?? '') == $category->id)>

                    {{ $category->name }}

                </option>
            @endforeach

        </select>

        @error('category_id')
            <div class="invalid-feedback">
                {{ $message }}
            </div>
        @enderror

    </div>

    <div class="col-md-6 mb-3">

        <label class="form-label">
            SKU
        </label>

        <input type="text" name="sku" class="form-control @error('sku') is-invalid @enderror"
            value="{{ old('sku', $product->sku ?? '') }}">

        @error('sku')
            <div class="invalid-feedback">
                {{ $message }}
            </div>
        @enderror

    </div>

</div>

<div class="mb-3">

    <label class="form-label">
        Código de barras
    </label>

    <input type="text" name="barcode" class="form-control @error('barcode') is-invalid @enderror"
        value="{{ old('barcode', $product->barcode ?? '') }}">

    @error('barcode')
        <div class="invalid-feedback">
            {{ $message }}
        </div>
    @enderror

</div>

<div class="mb-3">

    <label class="form-label">
        Nombre
    </label>

    <input type="text" name="name" class="form-control @error('name') is-invalid @enderror"
        value="{{ old('name', $product->name ?? '') }}">

    @error('name')
        <div class="invalid-feedback">
            {{ $message }}
        </div>
    @enderror

</div>

<div class="mb-4">

    <label class="form-label">
        Descripción
    </label>

    <textarea name="description" rows="3" class="form-control @error('description') is-invalid @enderror">{{ old('description', $product->description ?? '') }}</textarea>

    @error('description')
        <div class="invalid-feedback">
            {{ $message }}
        </div>
    @enderror

</div>

<hr class="my-4">

<h5 class="mb-3">
    Configuración del producto
</h5>

<div class="row">

    <div class="col-md-6 mb-3">

        <label class="form-label">
            Unidad
        </label>

        <input type="text" name="unit" class="form-control @error('unit') is-invalid @enderror"
            value="{{ old('unit', $product->unit ?? 'Unidad') }}">

        @error('unit')
            <div class="invalid-feedback">
                {{ $message }}
            </div>
        @enderror

    </div>

    <div class="col-md-6 mb-3">

        <label class="form-label">
            Stock mínimo
        </label>

        <input type="number" name="minimum_stock" min="0"
            class="form-control @error('minimum_stock') is-invalid @enderror"
            value="{{ old('minimum_stock', $product->minimum_stock ?? 5) }}">

        @error('minimum_stock')
            <div class="invalid-feedback">
                {{ $message }}
            </div>
        @enderror

    </div>

</div>

<hr class="my-4">

<h5 class="mb-3">
    Información comercial
</h5>

<div class="row">

    <div class="col-md-6 mb-3">

        <label class="form-label">
            Precio de compra
        </label>

        <input type="number" step="0.01" name="purchase_price"
            class="form-control @error('purchase_price') is-invalid @enderror"
            value="{{ old('purchase_price', $product->purchase_price ?? '') }}">

        @error('purchase_price')
            <div class="invalid-feedback">
                {{ $message }}
            </div>
        @enderror

    </div>

    <div class="col-md-6 mb-3">

        <label class="form-label">
            Precio de venta
        </label>

        <input type="number" step="0.01" name="sale_price"
            class="form-control @error('sale_price') is-invalid @enderror"
            value="{{ old('sale_price', $product->sale_price ?? '') }}">

        @error('sale_price')
            <div class="invalid-feedback">
                {{ $message }}
            </div>
        @enderror

    </div>

    <div class="col-md-4">

        <label class="form-label">
            Stock inicial
        </label>

        <input type="number" name="current_stock" min="0"
            class="form-control @error('current_stock') is-invalid @enderror"
            value="{{ old('current_stock', $product->current_stock ?? 0) }}">

        @error('current_stock')
            <div class="invalid-feedback">
                {{ $message }}
            </div>
        @enderror

    </div>

</div>

<hr class="my-4">

<div class="form-check">

    <input type="checkbox" id="is_active" name="is_active" value="1" class="form-check-input"
        {{ old('is_active', $product->is_active ?? true) ? 'checked' : '' }}>

    <label for="is_active" class="form-check-label">
        Activo
    </label>

</div>
