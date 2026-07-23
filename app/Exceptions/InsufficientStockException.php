<?php

namespace App\Exceptions;

use App\Models\Product;
use Exception;

class InsufficientStockException extends Exception
{
    public function __construct(Product $product)
    {
        parent::__construct(
            "No hay suficiente stock para el producto '{$product->name}'. Stock disponible: {$product->current_stock}."
        );
    }
}
