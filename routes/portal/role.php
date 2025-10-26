<?php

use App\Http\Controllers\Portal\RoleController;
use Illuminate\Support\Facades\Route;

Route::middleware('portal.auth')->prefix('roles')->name('roles.')->group(function () {
    Route::get('/', [RoleController::class, 'index'])->name('index');
    Route::get('/create', [RoleController::class, 'create'])->name('create');
    Route::post('/store', [RoleController::class, 'store'])->name('store');
    Route::get('/edit/{id?}', [RoleController::class, 'edit'])->name('edit');
    Route::put('/update/{id?}', [RoleController::class, 'update'])->name('update');
});