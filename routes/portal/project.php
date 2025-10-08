<?php

use App\Http\Controllers\Portal\ProjectController;
use Illuminate\Support\Facades\Route; 

Route::middleware('portal.auth')->prefix('projects')->name('projects.')->group(function () {
    Route::get('/', [ProjectController::class, 'index'])->name('index');
    Route::get('/create', [ProjectController::class, 'create'])->name('create');
});