<?php

use App\Http\Controllers\Portal\PermissionController;
use Illuminate\Support\Facades\Route;

Route::middleware('portal.auth')->prefix('permissions')->name('permissions.')->group(function () {
    Route::get('/', [PermissionController::class, 'index'])->name('index');
});