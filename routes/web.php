<?php

use Illuminate\Support\Facades\Route;

Route::name('portal.')->group(function () {
    require __DIR__. '/portal/main.php';
    require __DIR__. '/portal/auth.php';
    require __DIR__. '/portal/user.php';
    require __DIR__. '/portal/project.php';
    require __DIR__. '/portal/task.php';
});