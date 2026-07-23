<?php

namespace App\Services;

use App\Models\Order;
use Illuminate\Support\Facades\DB;
use App\Models\Product;
use App\Models\OrderDetail;
use Exception;
use App\Enums\OrderStatus;
use App\Exceptions\InsufficientStockException;

class OrderService
{
    public function create(array $data): Order
    {
        return DB::transaction(function () use ($data) {

            $order = Order::create([
                'client_id'  => $data['client_id'],
                'order_date' => $data['order_date'],
                'status'     => OrderStatus::Pending,
                'total'      => 0,
            ]);

            $this->createDetails($order, $data['products']);

            $this->calculateTotal($order);

            return $order;
        });
    }

    private function createDetails(Order $order, array $products): void
    {
        foreach ($products as $item) {

            $product = Product::where('id', $item['product_id'])
                ->lockForUpdate()
                ->firstOrFail();

            if ($product->current_stock < $item['quantity']) {

                throw new InsufficientStockException($product);
            }

            $subtotal = $product->sale_price * $item['quantity'];

            OrderDetail::create([
                'order_id'   => $order->id,
                'product_id' => $product->id,
                'quantity'   => $item['quantity'],
                'unit_price' => $product->sale_price,
                'subtotal'   => $subtotal,
            ]);

            $product->decrement(
                'current_stock',
                $item['quantity']
            );
        }
    }

    private function calculateTotal(Order $order): void
    {
        $total = $order->details()->sum('subtotal');

        $order->total = $total;

        $order->save();
    }

    private function restoreInventory(Order $order): void
    {
        foreach ($order->details as $detail) {

            $detail->product->increment(
                'current_stock',
                $detail->quantity
            );
        }
    }

    public function cancel(Order $order): void
    {
        DB::transaction(function () use ($order) {

            if ($order->status === OrderStatus::Completed) {

                throw new Exception(
                    'No es posible cancelar un pedido completado.'
                );
            }

            if ($order->status === OrderStatus::Cancelled) {
                return;
            }

            $order->load('details.product');

            $this->restoreInventory($order);

            $order->update([
                'status' => OrderStatus::Cancelled,
            ]);
        });
    }

    public function changeStatus(Order $order): void
    {
        DB::transaction(function () use ($order) {

            switch ($order->status) {

                case OrderStatus::Pending:

                    $order->update([
                        'status' => OrderStatus::Processing,
                    ]);

                    break;

                case OrderStatus::Processing:

                    $order->update([
                        'status' => OrderStatus::Completed,
                    ]);

                    break;

                default:

                    throw new Exception(
                        'El pedido ya no puede cambiar de estado.'
                    );
            }
        });
    }
}
