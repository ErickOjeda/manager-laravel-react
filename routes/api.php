<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::apiResource('clients', 'App\Http\Controllers\ClientController');
Route::apiResource('cities', 'App\Http\Controllers\CityController');
Route::apiResource('responsibles', 'App\Http\Controllers\ResponsibleController');
