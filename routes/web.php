<?php

use Illuminate\Support\Facades\Route;

Route::name('portal.')->group(function () {
    require __DIR__. '/portal/main.php';
    require __DIR__. '/portal/auth.php';
    require __DIR__. '/portal/user.php';
    require __DIR__. '/portal/project.php';
    require __DIR__. '/portal/task.php';
    require __DIR__. '/portal/report.php';
    require __DIR__. '/portal/profile.php';
    require __DIR__. '/portal/permission.php';
    require __DIR__. '/portal/role.php';
    require __DIR__. '/portal/audit-trail.php';
});