<?php

namespace App\Http\Controllers;

use App\Models\City;
use Illuminate\Http\Request;

class CityController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $filters = $request->only(['name', 'state']);
        $cities = City::where(function ($query) use ($filters) {
            foreach ($filters as $key => $value) {
                if (!empty($value)) {
                    $query->where($key, 'like', "%$value%");
                }
            }
        })->orderBy('created_at', 'desc')
        ->get();

        return response()->json($cities);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'state' => 'required|string|max:255',
        ]);

        $city = City::create($request->all());
        return response()->json($city, 201);
    }
    /**
     * Display the specified resource.
     */
    public function show(City $city)
    {
        return response()->json($city);
    }
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, City $city)
    {
        $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'state' => 'sometimes|required|string|max:255',
        ]);

        $city->update($request->all());
        return response()->json($city);
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(City $city)
    {
        $city->delete();
        return response()->json(null, 204);
    }


}
