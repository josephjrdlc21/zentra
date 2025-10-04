<?php

use Illuminate\Support\Facades\Route;

Route::name('portal.')->group(function () {
    require __DIR__. '/portal/main.php';
    require __DIR__. '/portal/auth.php';
});