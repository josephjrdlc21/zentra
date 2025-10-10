<?php

use App\Http\Controllers\Portal\ProjectController;
use Illuminate\Support\Facades\Route; 

Route::middleware('portal.auth')->prefix('projects')->name('projects.')->group(function () {
    Route::get('/', [ProjectController::class, 'index'])->name('index');
    Route::get('/create', [ProjectController::class, 'create'])->name('create');
    Route::post('/store', [ProjectController::class, 'store'])->name('store');
    Route::get('/edit/{id?}', [ProjectController::class, 'edit'])->name('edit');
    Route::put('/update/{id?}', [ProjectController::class, 'update'])->name('update');
    Route::get('/show/{id?}', [ProjectController::class, 'show'])->name('show');
});