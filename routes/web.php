<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect('/', '/clientes');

Route::get('clientes', function () {
    return Inertia::render('clientes');
})->name('clientes');

Route::get('cidades', function () {
    return Inertia::render('cidades');
})->name('cidades');

Route::get('responsaveis', function () {
    return Inertia::render('responsaveis');
})->name('responsaveis');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
