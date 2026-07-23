@extends('layouts.app')

@section('title', 'Nuevo Pedido')

@section('content')

    <div class="container">

        <div class="d-flex justify-content-between align-items-center mb-4">

            <h2>Nuevo Pedido</h2>

            <a href="{{ route('orders.index') }}" class="btn btn-secondary">
                Volver
            </a>

        </div>

        <form action="{{ route('orders.store') }}" method="POST">

            @csrf

            <div class="card shadow-sm mb-4">

                <div class="card-header">
                    Información del pedido
                </div>

                <div class="card-body">

                    <div class="row">

                        <div class="col-md-8 mb-3">

                            <label class="form-label">
                                Cliente
                            </label>

                            <select name="client_id" class="form-select @error('client_id') is-invalid @enderror">

                                <option value="">
                                    Seleccione...
                                </option>

                                @foreach ($clients as $client)
                                    <option value="{{ $client->id }}" @selected(old('client_id') == $client->id)>

                                        {{ $client->name }}

                                    </option>
                                @endforeach

                            </select>

                            @error('client_id')
                                <div class="invalid-feedback">
                                    {{ $message }}
                                </div>
                            @enderror

                        </div>

                        <div class="col-md-4 mb-3">

                            <label class="form-label">
                                Fecha
                            </label>

                            <input type="date" name="order_date" class="form-control"
                                value="{{ old('order_date', now()->format('Y-m-d')) }}">

                        </div>

                    </div>

                </div>

            </div>

            <div class="card shadow-sm mb-4">

                <div class="card-header">

                    Agregar productos

                </div>

                <div class="card-body">

                    <div class="row align-items-end">

                        <div class="col-md-6">

                            <label class="form-label">
                                Producto
                            </label>

                            <select id="product" class="form-select">

                                <option value="">
                                    Seleccione...
                                </option>

                                @foreach ($products as $product)
                                    <option value="{{ $product->id }}" data-name="{{ $product->name }}"
                                        data-sku="{{ $product->sku }}" data-price="{{ $product->sale_price }}"
                                        data-stock="{{ $product->current_stock }}">

                                        {{ $product->name }}

                                    </option>
                                @endforeach

                            </select>

                        </div>

                        <div class="col-md-2">

                            <label class="form-label">
                                Cantidad
                            </label>

                            <input id="quantity" type="number" min="1" value="1" class="form-control">

                        </div>

                        <div class="col-md-2">

                            <button type="button" id="add-product" class="btn btn-primary w-100">

                                Agregar

                            </button>

                        </div>

                    </div>

                </div>

            </div>

            <div class="card shadow-sm">

                <div class="card-header">

                    Detalle del pedido

                </div>

                <div class="card-body">

                    <table class="table table-bordered align-middle">

                        <thead class="table-light">

                            <tr>

                                <th>Producto</th>

                                <th width="120">
                                    Precio
                                </th>

                                <th width="120">
                                    Cantidad
                                </th>

                                <th width="150">
                                    Subtotal
                                </th>

                                <th width="100">
                                    Acción
                                </th>

                            </tr>

                        </thead>

                        <tbody id="detail-body">

                            <tr>

                                <td colspan="5" class="text-center text-muted">

                                    No hay productos agregados.

                                </td>

                            </tr>

                        </tbody>

                        <tfoot>

                            <tr>

                                <th colspan="3" class="text-end">

                                    Total

                                </th>

                                <th id="total">

                                    $0.00

                                </th>

                                <th></th>

                            </tr>

                        </tfoot>

                    </table>

                </div>

            </div>

            <div id="hidden-inputs"></div>

            <div class="mt-4">

                <button type="submit" class="btn btn-success">

                    Guardar Pedido

                </button>

            </div>

        </form>

    </div>

@endsection
