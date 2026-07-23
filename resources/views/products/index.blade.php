@extends('layouts.app')

@section('title', 'Productos')

@section('content')

    <div class="d-flex justify-content-between align-items-center mb-4">

        <h2>Productos</h2>

        <a href="{{ route('products.create') }}" class="btn btn-success">
            Nuevo Producto
        </a>

    </div>

    <table class="table table-striped table-hover">

        <thead class="table-dark">

            <tr>
                <th>SKU</th>
                <th>Producto</th>
                <th>Categoría</th>
                <th>Precio Compra</th>
                <th>Precio Venta</th>
                <th>Stock</th>
                <th>Estado</th>
                <th width="180">Acciones</th>
            </tr>

        </thead>

        <tbody>

            @forelse($products as $product)
                <tr>

                    <td>{{ $product->sku }}</td>

                    <td>{{ $product->name }}</td>

                    <td>{{ $product->category->name }}</td>

                    <td>${{ number_format($product->purchase_price, 2) }}</td>

                    <td>${{ number_format($product->sale_price, 2) }}</td>

                    <td>

                        @if ($product->current_stock == 0)
                            <span class="badge bg-danger">
                                Sin stock
                            </span>
                        @elseif ($product->current_stock <= $product->minimum_stock)
                            <span class="badge bg-warning text-dark">
                                Stock bajo ({{ $product->current_stock }})
                            </span>
                        @else
                            <span class="badge bg-success">
                                Disponible ({{ $product->current_stock }})
                            </span>
                        @endif

                    </td>

                    <td>

                        @if ($product->is_active)
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

                            <a href="{{ route('products.edit', $product) }}" class="btn btn-warning btn-sm">

                                Editar

                            </a>

                            <form action="{{ route('products.destroy', $product) }}" method="POST"
                                onsubmit="return confirm('¿Desea eliminar este producto?')">

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

                    <td colspan="8" class="text-center">

                        No existen productos registrados.

                    </td>

                </tr>
            @endforelse

        </tbody>

    </table>

    <div class="mt-3">

        {{ $products->links() }}

    </div>

@endsection
