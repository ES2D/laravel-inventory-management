@extends('layouts.app')

@section('title', 'Editar Producto')

@section('content')

    <h2 class="mb-4">

        Editar Producto

    </h2>

    <x-validation-errors />

    <form action="{{ route('products.update', $product) }}" method="POST">

        @csrf
        @method('PUT')

        @include('products._partials.form')

        <button type="submit" class="btn btn-warning">

            Actualizar Producto

        </button>

        <a href="{{ route('products.index') }}" class="btn btn-secondary">

            Cancelar

        </a>

    </form>

@endsection
