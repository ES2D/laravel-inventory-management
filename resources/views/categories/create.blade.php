@extends('layouts.app')

@section('title', 'Nueva Categoría')

@section('content')

    <h2 class="mb-4">

        Nueva Categoría

    </h2>

    <x-validation-errors />

    <form action="{{ route('categories.store') }}" method="POST">

        @csrf

        @include('categories._partials.form')

        <button type="submit" class="btn btn-success">

            Guardar Categoría

        </button>

        <a href="{{ route('categories.index') }}" class="btn btn-secondary">

            Cancelar

        </a>

    </form>

@endsection
