@extends('layouts.app')

@section('title', 'Clientes')

@section('content')

    <div class="d-flex justify-content-between align-items-center mb-4">

        <h2>Clientes</h2>

        <a href="{{ route('clients.create') }}" class="btn btn-success">
            Nuevo Cliente
        </a>

    </div>

    <table class="table table-striped table-hover">

        <thead class="table-dark">

            <tr>

                <th>Nombre</th>
                <th>Documento</th>
                <th>Correo electrónico</th>
                <th>Teléfono</th>
                <th>Estado</th>
                <th width="180">Acciones</th>

            </tr>

        </thead>

        <tbody>

            @forelse($clients as $client)
                <tr>

                    <td>{{ $client->name }}</td>

                    <td>{{ $client->document }}</td>

                    <td>{{ $client->email ?? 'No registrado' }}</td>

                    <td>{{ $client->phone ?? 'No registrado' }}</td>

                    <td>

                        @if ($client->is_active)
                            <span class="badge bg-success">
                                Activo
                            </span>
                        @else
                            <span class="badge bg-secondary">
                                Inactivo
                            </span>
                        @endif

                    </td>

                    <td>

                        <div class="d-flex gap-2">

                            <a href="{{ route('clients.edit', $client) }}" class="btn btn-warning btn-sm">

                                Editar

                            </a>

                            <form action="{{ route('clients.destroy', $client) }}" method="POST"
                                onsubmit="return confirm('¿Desea eliminar este cliente?')">

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

                    <td colspan="6" class="text-center">

                        No existen clientes registrados.

                    </td>

                </tr>
            @endforelse

        </tbody>

    </table>

    <div class="mt-3">

        {{ $clients->links() }}

    </div>

@endsection
