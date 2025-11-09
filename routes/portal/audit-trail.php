<?php

use App\Http\Controllers\Portal\AuditTrailController;
use Illuminate\Support\Facades\Route;

Route::middleware('portal.auth')->prefix('audit-trails')->name('audit-trails.')->group(function () {
    Route::get('/', [AuditTrailController::class, 'index'])->name('index')->middleware('portal.permission:portal.activity_logs.index');
});