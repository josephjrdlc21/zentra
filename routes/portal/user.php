<?php

use App\Http\Controllers\Portal\UserController;
use Illuminate\Support\Facades\Route; 

Route::middleware('portal.auth')->prefix('users')->name('users.')->group(function () {
    Route::get('/', [UserController::class, 'index'])->name('index');
    Route::get('/create', [UserController::class, 'create'])->name('create');
    Route::post('/create', [UserController::class, 'store'])->name('store');
    Route::get('/edit/{id?}', [UserController::class, 'edit'])->name('edit');
    Route::put('/edit/{id?}', [UserController::class, 'update'])->name('update');
    Route::get('/show/{id?}', [UserController::class, 'show'])->name('show');
});