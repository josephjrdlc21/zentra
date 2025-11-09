<?php

use App\Http\Controllers\Portal\RoleController;
use Illuminate\Support\Facades\Route;

Route::middleware('portal.auth')->prefix('roles')->name('roles.')->group(function () {
    Route::get('/', [RoleController::class, 'index'])->name('index')->middleware('portal.permission:portal.roles.index');
    Route::get('/create', [RoleController::class, 'create'])->name('create')->middleware('portal.permission:portal.roles.create');
    Route::post('/store', [RoleController::class, 'store'])->name('store')->middleware('portal.permission:portal.roles.create');
    Route::get('/edit/{id?}', [RoleController::class, 'edit'])->name('edit')->middleware('portal.permission:portal.roles.update');
    Route::put('/update/{id?}', [RoleController::class, 'update'])->name('update')->middleware('portal.permission:portal.roles.update');
});