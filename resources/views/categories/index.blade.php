@extends('layouts.app')

@section('title', 'Categorías')

@section('content')

    <div class="d-flex justify-content-between align-items-center mb-4">

        <h2>Categorías</h2>

        <a href="{{ route('categories.create') }}" class="btn btn-success">
            Nueva categoría
        </a>

    </div>

    <table class="table table-striped table-hover">

        <thead class="table-dark">

            <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Estado</th>
                <th width="180">Acciones</th>
            </tr>

        </thead>

        <tbody>

            @forelse($categories as $category)
                <tr>

                    <td>{{ $category->id }}</td>

                    <td>{{ $category->name }}</td>

                    <td>{{ $category->description ?? 'Sin descripción' }}</td>

                    <td>

                        @if ($category->is_active)
                            <span class="badge bg-success">
                                Activa
                            </span>
                        @else
                            <span class="badge bg-danger">
                                Inactiva
                            </span>
                        @endif

                    </td>

                    <td>

                        <div class="d-flex gap-2">

                            <a href="{{ route('categories.edit', $category) }}" class="btn btn-warning btn-sm">
                                Editar
                            </a>

                            <form action="{{ route('categories.destroy', $category) }}" method="POST"
                                onsubmit="return confirm('¿Desea eliminar esta categoría?')">

                                @csrf
                                @method('DELETE')

                                <button type="submit" class="btn btn-danger btn-sm">
                                    Eliminar
                                </button>

                            </form>

                        </div>

                    </td>

                </tr>

            @empty

                <tr>

                    <td colspan="5" class="text-center">

                        No existen categorías registradas.

                    </td>

                </tr>
            @endforelse

        </tbody>

    </table>

    <div class="mt-3">
        {{ $categories->links() }}
    </div>

@endsection
