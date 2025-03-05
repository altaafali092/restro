<?php

use App\Http\Controllers\FrontendController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;



Route::get('/',[FrontendController::class, 'index'])->name('home');

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
