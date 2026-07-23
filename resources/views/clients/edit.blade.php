@extends('layouts.app')

@section('title', 'Editar Cliente')

@section('content')

    <h2 class="mb-4">

        Editar Cliente

    </h2>

    <x-validation-errors />

    <form action="{{ route('clients.update', $client) }}" method="POST">

        @csrf
        @method('PUT')

        @include('clients._partials.form')

        <button type="submit" class="btn btn-warning">

            Actualizar Cliente

        </button>

        <a href="{{ route('clients.index') }}" class="btn btn-secondary">

            Cancelar

        </a>

    </form>

@endsection
