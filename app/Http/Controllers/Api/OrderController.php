<?php

namespace App\Http\Controllers\Api;

use App\Models\Order;
use App\Services\OrderService;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreOrderRequest;

class OrderController extends Controller
{
    public function __construct(
        private OrderService $orderService
    ) {}

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Order::with('client')
            ->latest()
            ->paginate(10);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(
        StoreOrderRequest $request
    ) {
        $order = $this->orderService->create(
            $request->validated()
        );

        return response()->json([
            'message' => 'Pedido creado correctamente.',
            'data' => $order,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        return $order->load([
            'client',
            'details.product',
        ]);
    }

    public function changeStatus(
        Order $order
    ) {
        $this->orderService
            ->changeStatus($order);

        return response()->json([
            'message' =>
            'Estado actualizado.',
        ]);
    }

    public function cancel(
        Order $order
    ) {
        $this->orderService
            ->cancel($order);

        return response()->json([
            'message' =>
            'Pedido cancelado.',
        ]);
    }
}
