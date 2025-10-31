<?php

use App\Http\Controllers\Portal\MainController;
use Illuminate\Support\Facades\Route; 

Route::middleware('portal.guest')->group(function () {
    Route::get('/', [MainController::class, 'home'])->name('home');
});

Route::middleware('portal.auth')->group(function () {
    Route::get('/dashboard', [MainController::class, 'index'])->name('index');
});
