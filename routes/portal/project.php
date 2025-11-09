<?php

use App\Http\Controllers\Portal\ProjectController;
use Illuminate\Support\Facades\Route; 

Route::middleware('portal.auth')->prefix('projects')->name('projects.')->group(function () {
    Route::get('/', [ProjectController::class, 'index'])->name('index')->middleware('portal.permission:portal.projects.index');
    Route::get('/create', [ProjectController::class, 'create'])->name('create')->middleware('portal.permission:portal.projects.create');
    Route::post('/store', [ProjectController::class, 'store'])->name('store')->middleware('portal.permission:portal.projects.create');
    Route::get('/edit/{id?}', [ProjectController::class, 'edit'])->name('edit')->middleware('portal.permission:portal.projects.update');
    Route::put('/update/{id?}', [ProjectController::class, 'update'])->name('update')->middleware('portal.permission:portal.projects.update');
    Route::get('/show/{id?}', [ProjectController::class, 'show'])->name('show')->middleware('portal.permission:portal.projects.view');
    Route::delete('/delete/{id?}', [ProjectController::class, 'destroy'])->name('delete')->middleware('portal.permission:portal.projects.delete');
});