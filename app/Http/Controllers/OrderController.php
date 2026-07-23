<?php

namespace App\Http\Controllers;

use App\Services\OrderService;
use App\Models\Client;
use App\Models\Order;
use App\Models\Product;
use App\Http\Requests\StoreOrderRequest;

class OrderController extends Controller
{
    public function __construct(
        private OrderService $orderService
    ) {}

    public function index()
    {
        $orders = Order::with('client')
            ->latest()
            ->paginate(10);

        return view('orders.index', compact('orders'));
    }

    public function show(Order $order)
    {
        $order->load([
            'client',
            'details.product',
        ]);

        return view('orders.show', compact('order'));
    }

    public function create()
    {
        $clients = Client::where('is_active', true)
            ->orderBy('name')
            ->get();

        $products = Product::where('is_active', true)
            ->orderBy('name')
            ->get();

        return view(
            'orders.create',
            compact('clients', 'products')
        );
    }

    public function store(StoreOrderRequest $request)
    {
        try {

            $this->orderService->create(
                $request->validated()
            );

            return redirect()
                ->route('orders.index')
                ->with('success', 'Pedido creado correctamente.');
        } catch (\App\Exceptions\InsufficientStockException $e) {

            return back()
                ->withInput()
                ->with('error', $e->getMessage());
        }
    }

    public function changeStatus(Order $order)
    {
        try {

            $this->orderService->changeStatus($order);

            return back()->with(
                'success',
                'Estado actualizado correctamente.'
            );
        } catch (\Exception $e) {

            return back()->with(
                'error',
                $e->getMessage()
            );
        }
    }

    public function cancel(Order $order)
    {
        try {

            $this->orderService->cancel($order);

            return back()->with(
                'success',
                'Pedido cancelado correctamente.'
            );
        } catch (\Exception $e) {

            return back()->with(
                'error',
                $e->getMessage()
            );
        }
    }
}
