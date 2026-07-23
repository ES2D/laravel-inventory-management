@extends('layouts.app')

@section('title', 'Nuevo Producto')

@section('content')

    <h2 class="mb-4">Nuevo Producto</h2>

    <x-validation-errors />

    <form action="{{ route('products.store') }}" method="POST">

        @csrf

        @include('products._partials.form')

        <button class="btn btn-primary mt-4">

            Guardar Producto

        </button>

    </form>

@endsection
