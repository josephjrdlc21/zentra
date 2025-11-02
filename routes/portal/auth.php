<?php

use App\Http\Controllers\Portal\AuthController;
use Illuminate\Support\Facades\Route; 

Route::name('auth.')->group(function () {
    Route::middleware('portal.guest')->group(function () {
        Route::get('/login', [AuthController::class, 'login'])->name('login');
        Route::post('/authenticate', [AuthController::class, 'authenticate'])->name('authenticate');
        Route::get('/register', [AuthController::class, 'register'])->name('register');
        Route::post('/store', [AuthController::class, 'store'])->name('store');
        Route::get('/verify/{token?}', [AuthController::class, 'verify'])->name('verify');
        Route::post('/store-verify/{token?}', [AuthController::class, 'store_verify'])->name('store_verify');
    });
    Route::get('/logout', [AuthController::class, 'logout'])->name('logout');
});