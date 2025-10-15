<?php

use App\Http\Controllers\Portal\ReportController;
use Illuminate\Support\Facades\Route;

Route::middleware('portal.auth')->prefix('reports')->name('reports.')->group(function () {
    Route::get('/', [ReportController::class, 'index'])->name('index');
});