<?php

namespace App\Http\Controllers\Api;

use App\Models\Client;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreClientRequest;
use App\Http\Requests\UpdateClientRequest;

class ClientController extends Controller
{
    public function index()
    {
        return Client::latest()
            ->paginate(10);
    }

    public function store(
        StoreClientRequest $request
    ) {
        $client = Client::create(
            $request->validated()
        );

        return response()->json([
            'message' =>
            'Cliente creado correctamente.',
            'data' => $client,
        ], 201);
    }

    public function show(
        Client $client
    ) {
        return $client;
    }

    public function update(
        UpdateClientRequest $request,
        Client $client
    ) {
        $client->update(
            $request->validated()
        );

        return response()->json([
            'message' =>
            'Cliente actualizado correctamente.',
            'data' => $client,
        ]);
    }

    public function destroy(
        Client $client
    ) {
        $client->delete();

        return response()->json([
            'message' =>
            'Cliente eliminado correctamente.',
        ]);
    }
}
