<?php

use App\Http\Controllers\Portal\UserController;
use Illuminate\Support\Facades\Route; 

Route::middleware('portal.auth')->prefix('users')->name('users.')->group(function () {
    Route::get('/', [UserController::class, 'index'])->name('index');
    Route::get('/create', [UserController::class, 'create'])->name('create');
    Route::post('/create', [UserController::class, 'store'])->name('store');
});