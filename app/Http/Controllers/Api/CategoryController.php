<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Category::paginate(10);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(
        StoreCategoryRequest $request
    ) {
        return Category::create(
            $request->validated()
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(
        Category $category
    ) {
        return $category;
    }

    /**
     * Update the specified resource in storage.
     */

    public function update(
        UpdateCategoryRequest $request,
        Category $category
    ) {
        $category->update(
            $request->validated()
        );

        return response()->json([
            'message' => 'Categoría actualizada correctamente.',
            'data' => $category,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        $category->delete();

        return response()->json([
            'message' => 'Categoría eliminada correctamente.',
        ]);
    }
}
