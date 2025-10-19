<?php

use App\Http\Controllers\Portal\ProfileController;
use Illuminate\Support\Facades\Route;

Route::middleware('portal.auth')->prefix('profile')->name('profile.')->group(function () {
    Route::get('/', [ProfileController::class, 'index'])->name('index');
    Route::get('/edit-password', [ProfileController::class, 'edit_password'])->name('edit_password');
    Route::put('/update-pass', [ProfileController::class, 'update_pass'])->name('update_pass');
});