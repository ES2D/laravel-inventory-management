<div class="mb-3">

    <label for="name" class="form-label">
        Nombre
    </label>

    <input type="text" id="name" name="name" class="form-control @error('name') is-invalid @enderror"
        value="{{ old('name', $category->name ?? '') }}">

    @error('name')
        <div class="invalid-feedback">
            {{ $message }}
        </div>
    @enderror

</div>

<div class="mb-3">

    <label for="description" class="form-label">
        Descripción
    </label>

    <textarea id="description" name="description" class="form-control @error('description') is-invalid @enderror"
        rows="3">{{ old('description', $category->description ?? '') }}</textarea>

    @error('description')
        <div class="invalid-feedback">
            {{ $message }}
        </div>
    @enderror

</div>

<div class="form-check mb-4">

    <input type="checkbox" id="is_active" name="is_active" value="1" class="form-check-input"
        {{ old('is_active', $category->is_active ?? true) ? 'checked' : '' }}>

    <label for="is_active" class="form-check-label">
        Activa
    </label>

</div>
