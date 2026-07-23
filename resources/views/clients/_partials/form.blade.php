<div class="mb-3">

    <label for="name" class="form-label">
        Nombre
    </label>

    <input type="text" id="name" name="name" class="form-control @error('name') is-invalid @enderror"
        value="{{ old('name', $client->name ?? '') }}">

    @error('name')
        <div class="invalid-feedback">
            {{ $message }}
        </div>
    @enderror

</div>

<div class="mb-3">

    <label for="document" class="form-label">
        Documento
    </label>

    <input type="text" id="document" name="document" class="form-control @error('document') is-invalid @enderror"
        value="{{ old('document', $client->document ?? '') }}">

    @error('document')
        <div class="invalid-feedback">
            {{ $message }}
        </div>
    @enderror

</div>

<div class="mb-3">

    <label for="email" class="form-label">
        Correo electrónico
    </label>

    <input type="email" id="email" name="email" class="form-control @error('email') is-invalid @enderror"
        value="{{ old('email', $client->email ?? '') }}">

    @error('email')
        <div class="invalid-feedback">
            {{ $message }}
        </div>
    @enderror

</div>

<div class="mb-3">

    <label for="phone" class="form-label">
        Teléfono
    </label>

    <input type="text" id="phone" name="phone" class="form-control @error('phone') is-invalid @enderror"
        value="{{ old('phone', $client->phone ?? '') }}">

    @error('phone')
        <div class="invalid-feedback">
            {{ $message }}
        </div>
    @enderror

</div>

<div class="form-check mb-4">

    <input type="checkbox" id="is_active" name="is_active" value="1" class="form-check-input"
        {{ old('is_active', $client->is_active ?? true) ? 'checked' : '' }}>

    <label for="is_active" class="form-check-label">

        Activo

    </label>

</div>
