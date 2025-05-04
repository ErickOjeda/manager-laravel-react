<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        $filters = $request->only(['name', 'cpf', 'genre', 'birth', 'city', 'state']);
        $clients = Client::with('city')->where(function ($query) use ($filters) {
            foreach ($filters as $key => $value) {
            if (!empty($value)) {
                if (in_array($key, ['city', 'state'])) {
                $query->whereHas('city', function ($cityQuery) use ($key, $value) {
                    $key = $key === 'city' ? 'name' : 'state';
                    $cityQuery->where($key, 'like', "%$value%");
                });
                } else {
                $query->where($key, 'like', "%$value%");
                }
            }
            }
        })->orderBy('created_at', 'desc')
        ->get();
        
        return response()->json($clients);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'cpf' => 'required|string|max:14|unique:clients,cpf',
            'genre' => 'required|string|in:M,F',
            'birth' => 'required|date',
            'city_id' => 'nullable|exists:cities,id',
        ]);

        $client = Client::create($request->all());

        return response()->json($client, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {

        $request->validate([
            'name' => 'required|string|max:255',
            'cpf' => 'required|string|max:14|unique:clients,cpf,' . $id,
            'genre' => 'required|string|in:M,F',
            'birth' => 'required|date',
            'city_id' => 'nullable|exists:cities,id',
        ]);

        $client = Client::findOrFail($id);
        $client->update($request->all());

        return response()->json($client);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $client = Client::findOrFail($id);
        $client->delete();

        return response()->json(null, 204);
    }
}
