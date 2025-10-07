<?php

use App\Http\Controllers\Portal\UserController;
use Illuminate\Support\Facades\Route; 

Route::middleware('portal.auth')->prefix('users')->name('users.')->group(function () {
    Route::get('/', [UserController::class, 'index'])->name('index');
    Route::get('/create', [UserController::class, 'create'])->name('create');
    Route::post('/store', [UserController::class, 'store'])->name('store');
    Route::get('/edit/{id?}', [UserController::class, 'edit'])->name('edit');
    Route::put('/update/{id?}', [UserController::class, 'update'])->name('update');
    Route::put('/update-status/{id?}', [UserController::class, 'update_status'])->name('update_status');
    Route::put('/update-password/{id?}', [UserController::class, 'update_password'])->name('update_password');
    Route::get('/show/{id?}', [UserController::class, 'show'])->name('show');
    Route::delete('/delete/{id?}', [UserController::class, 'destroy'])->name('delete');
});