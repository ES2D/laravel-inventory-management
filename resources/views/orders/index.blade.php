@extends('layouts.app')

@section('title', 'Pedidos')

@section('content')

    <div class="d-flex justify-content-between align-items-center mb-4">

        <h2>Pedidos</h2>

        <a href="{{ route('orders.create') }}" class="btn btn-success">
            Nuevo Pedido
        </a>

    </div>

    <table class="table table-striped table-hover">

        <thead class="table-dark">

            <tr>

                <th>#</th>
                <th>Cliente</th>
                <th>Fecha</th>
                <th>Total</th>
                <th>Estado</th>
                <th width="120">Acciones</th>

            </tr>

        </thead>

        <tbody>

            @forelse($orders as $order)
                <tr>

                    <td>{{ $order->id }}</td>

                    <td>{{ $order->client->name }}</td>

                    <td>{{ $order->order_date->format('d/m/Y') }}</td>

                    <td>
                        ${{ number_format($order->total, 2) }}
                    </td>

                    <td>

                        @switch($order->status)
                            @case(\App\Enums\OrderStatus::Pending)
                                <span class="badge bg-warning text-dark">
                                    Pendiente
                                </span>
                            @break

                            @case(\App\Enums\OrderStatus::Processing)
                                <span class="badge bg-primary">
                                    En proceso
                                </span>
                            @break

                            @case(\App\Enums\OrderStatus::Completed)
                                <span class="badge bg-success">
                                    Completado
                                </span>
                            @break

                            @case(\App\Enums\OrderStatus::Cancelled)
                                <span class="badge bg-danger">
                                    Cancelado
                                </span>
                            @break
                        @endswitch

                    </td>

                    <td>

                        <a href="{{ route('orders.show', $order) }}" class="btn btn-info btn-sm">

                            Ver

                        </a>

                    </td>

                </tr>

                @empty

                    <tr>

                        <td colspan="6" class="text-center">

                            No existen pedidos registrados.

                        </td>

                    </tr>
                @endforelse

            </tbody>

        </table>

        <div class="mt-3">

            {{ $orders->links() }}

        </div>

    @endsection
