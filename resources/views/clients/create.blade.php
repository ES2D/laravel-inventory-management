@extends('layouts.app')

@section('title', 'Nuevo Cliente')

@section('content')

    <h2 class="mb-4">

        Nuevo Cliente

    </h2>

    <x-validation-errors />

    <form action="{{ route('clients.store') }}" method="POST">

        @csrf

        @include('clients._partials.form')

        <button type="submit" class="btn btn-success">

            Guardar Cliente

        </button>

        <a href="{{ route('clients.index') }}" class="btn btn-secondary">

            Cancelar

        </a>

    </form>

@endsection
