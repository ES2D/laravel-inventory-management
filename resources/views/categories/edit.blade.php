@extends('layouts.app')

@section('title', 'Editar Categoría')

@section('content')

    <h2 class="mb-4">Editar Categoría</h2>

    <x-validation-errors />

    <form action="{{ route('categories.update', $category) }}" method="POST">

        @csrf
        @method('PUT')

        @include('categories._partials.form')

        <button type="submit" class="btn btn-warning">
            Actualizar Categoría
        </button>

        <a href="{{ route('categories.index') }}" class="btn btn-secondary">
            Cancelar
        </a>

    </form>

@endsection
