<?php

use App\Http\Controllers\Api\CategoryController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\ClientController;
use App\Http\Controllers\Api\OrderController;

Route::apiResource(
    'orders',
    OrderController::class
);

Route::apiResource(
    'clients',
    ClientController::class
);

Route::apiResource(
    'products',
    ProductController::class
);

Route::apiResource(
    'categories',
    CategoryController::class
);
