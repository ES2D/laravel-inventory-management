<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\OrderController;


Route::get('/', function () {
    return view('welcome');
});

Route::resource('categories', CategoryController::class);
Route::resource('products', ProductController::class);
Route::resource('clients', ClientController::class);
Route::resource('orders', OrderController::class);

Route::patch(
    '/orders/{order}/status',
    [OrderController::class, 'changeStatus']
)->name('orders.change-status');

Route::patch(
    '/orders/{order}/cancel',
    [OrderController::class, 'cancel']
)->name('orders.cancel');
