<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Event;

use Inertia\Inertia;

class InertiaServiceProvider extends ServiceProvider
{
   /**
     * Register any application services.
     */
    public function register(): void
    {

    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Inertia::share([
            'flash' => function () {
                return [
                    'status' => session()->get('notification-status'),
                    'message' => session()->get('notification-msg'),
                ];
            },
        ]);
    }
}