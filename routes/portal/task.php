<?php

use App\Http\Controllers\Portal\TaskController;
use Illuminate\Support\Facades\Route;

Route::middleware('portal.auth')->prefix('tasks')->name('tasks.')->group(function () {
    Route::get('/', [TaskController::class, 'index'])->name('index')->middleware('portal.permission:portal.tasks.index');
    Route::get('/board', [TaskController::class, 'board'])->name('board')->middleware('portal.permission:portal.tasks.board');
    Route::get('/create', [TaskController::class, 'create'])->name('create')->middleware('portal.permission:portal.tasks.create');
    Route::post('/store', [TaskController::class, 'store'])->name('store')->middleware('portal.permission:portal.tasks.create');
    Route::get('/edit/{id?}', [TaskController::class, 'edit'])->name('edit')->middleware('portal.permission:portal.tasks.edit');
    Route::put('/update/{id?}', [TaskController::class, 'update'])->name('update')->middleware('portal.permission:portal.tasks.update');
    Route::put('/update-status/{id?}', [TaskController::class, 'update_status'])->name('update_status')->middleware('portal.permission:portal.tasks.update_status');
    Route::get('/show/{id?}', [TaskController::class, 'show'])->name('show')->middleware('portal.permission:portal.tasks.view');
    Route::delete('/delete/{id?}', [TaskController::class, 'destroy'])->name('delete')->middleware('portal.permission:portal.tasks.delete');
});