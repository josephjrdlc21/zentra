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
        Route::get('/forgot-password', [AuthController::class, 'forgot_password'])->name('forgot_password');
        Route::post('/store-forgot-password', [AuthController::class, 'store_forgot_password'])->name('store_forgot_password');
        Route::get('/password/{token?}', [AuthController::class, 'password'])->name('password');
        Route::post('/store-password/{token?}', [AuthController::class, 'store_password'])->name('store_password');
    });
    Route::get('/logout', [AuthController::class, 'logout'])->name('logout');
});