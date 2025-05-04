<?php

namespace App\Http\Controllers;

use App\Models\Responsible;
use Illuminate\Http\Request;

class ResponsibleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        
        $filters = $request->only(['name', 'email', 'phone', 'city', 'state']);
        $responsibles = Responsible::with('city')->where(function ($query) use ($filters) {  
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
        return response()->json($responsibles);

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:responsibles,email',
            'phone' => 'required|string|max:19',
            'city_id' => 'nullable|exists:cities,id',
        ]);

        $responsible = Responsible::create($request->all());

        return response()->json($responsible, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $responsible = Responsible::with('city')->find($id);

        if (!$responsible) {
            return response()->json(['message' => 'Responsible not found'], 404);
        }

        return response()->json($responsible);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:responsibles,email,' . $id,
            'phone' => 'required|string|max:19',
            'city_id' => 'nullable|exists:cities,id',
        ]);

        $responsible = Responsible::find($id);

        if (!$responsible) {
            return response()->json(['message' => 'Responsible not found'], 404);
        }

        $responsible->update($request->all());

        return response()->json($responsible);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $responsible = Responsible::find($id);

        if (!$responsible) {
            return response()->json(['message' => 'Responsible not found'], 404);
        }

        $responsible->delete();

        return response()->json(['message' => 'Responsible deleted successfully']);
    }
}
