<?php

use App\Http\Controllers\Portal\MainController;
use Illuminate\Support\Facades\Route; 

Route::middleware('portal.auth')->group(function () {
    Route::get('/', [MainController::class, 'index'])->name('index');
});
