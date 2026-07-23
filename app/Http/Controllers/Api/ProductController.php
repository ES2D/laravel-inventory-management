<?php

namespace App\Http\Controllers\Api;

use App\Models\Product;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Product::with('category')
            ->latest()
            ->paginate(10);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(
        StoreProductRequest $request
    ) {
        $product = Product::create(
            $request->validated()
        );

        return response()->json([
            'message' => 'Producto creado correctamente.',
            'data' => $product,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(
        Product $product
    ) {
        return $product->load(
            'category'
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(
        UpdateProductRequest $request,
        Product $product
    ) {
        $product->update(
            $request->validated()
        );

        return response()->json([
            'message' =>
            'Producto actualizado correctamente.',
            'data' => $product,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(
        Product $product
    ) {
        $product->delete();

        return response()->json([
            'message' =>
            'Producto eliminado correctamente.',
        ]);
    }
}
