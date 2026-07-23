@extends('layouts.app')

@section('title', 'Detalle del Pedido')

@section('content')

    <div class="d-flex justify-content-between align-items-center mb-4">

        <h2>

            Pedido #{{ $order->id }}

        </h2>

        <a href="{{ route('orders.index') }}" class="btn btn-secondary">

            Volver

        </a>

    </div>

    <div class="card shadow-sm mb-4">

        <div class="card-header">

            Información

        </div>

        <div class="card-body">

            <div class="row">

                <div class="col-md-4">

                    <strong>Cliente</strong>

                    <p>{{ $order->client->name }}</p>

                </div>

                <div class="col-md-4">

                    <strong>Fecha</strong>

                    <p>{{ $order->order_date->format('d/m/Y') }}</p>

                </div>

                <div class="col-md-4">

                    <strong>Estado</strong>

                    <p>

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

                    </p>

                </div>

            </div>

        </div>

    </div>

    <div class="mb-4 d-flex gap-2">

        @if ($order->status === \App\Enums\OrderStatus::Pending)
            <form method="POST" action="{{ route('orders.change-status', $order) }}">

                @csrf
                @method('PATCH')

                <button class="btn btn-primary">

                    Pasar a En proceso

                </button>

            </form>
        @elseif($order->status === \App\Enums\OrderStatus::Processing)
            <form method="POST" action="{{ route('orders.change-status', $order) }}">

                @csrf
                @method('PATCH')

                <button class="btn btn-success">

                    Completar pedido

                </button>

            </form>
        @endif

        @if ($order->status !== \App\Enums\OrderStatus::Completed && $order->status !== \App\Enums\OrderStatus::Cancelled)
            <form method="POST" action="{{ route('orders.cancel', $order) }}">

                @csrf
                @method('PATCH')

                <button class="btn btn-danger" onclick="return confirm('¿Cancelar este pedido?')">

                    Cancelar

                </button>

            </form>
        @endif

    </div>

    <div class="card shadow-sm">

        <div class="card-header">

            Productos

        </div>

        <div class="card-body">

            <table class="table table-bordered">

                <thead class="table-light">

                    <tr>

                        <th>Producto</th>

                        <th>Precio</th>

                        <th>Cantidad</th>

                        <th>Subtotal</th>

                    </tr>

                </thead>

                <tbody>

                    @foreach ($order->details as $detail)
                        <tr>

                            <td>

                                {{ $detail->product->name }}

                            </td>

                            <td>

                                ${{ number_format($detail->unit_price, 2) }}

                            </td>

                            <td>

                                {{ $detail->quantity }}

                            </td>

                            <td>

                                ${{ number_format($detail->subtotal, 2) }}

                            </td>

                        </tr>
                    @endforeach

                </tbody>

                <tfoot>

                    <tr>

                        <th colspan="3" class="text-end">

                            Total

                        </th>

                        <th>

                            ${{ number_format($order->total, 2) }}

                        </th>

                    </tr>

                </tfoot>

            </table>

        </div>

    </div>

@endsection
