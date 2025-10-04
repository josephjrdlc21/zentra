<?php

use App\Http\Controllers\Portal\MainController;
use Illuminate\Support\Facades\Route; 

Route::get('/', [MainController::class, 'index'])->name('index');
