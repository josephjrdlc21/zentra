<?php

use App\Http\Controllers\Portal\TaskController;
use Illuminate\Support\Facades\Route;

Route::middleware('portal.auth')->prefix('tasks')->name('tasks.')->group(function () {
    Route::get('/', [TaskController::class, 'index'])->name('index');
    Route::get('/board', [TaskController::class, 'board'])->name('board');
    Route::get('/create', [TaskController::class, 'create'])->name('create');
    Route::post('/store', [TaskController::class, 'store'])->name('store');
});