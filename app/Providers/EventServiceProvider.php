<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Event;

class EventServiceProvider extends ServiceProvider
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
        Event::listen(\App\Events\UserAccountCreated::class, \App\Listeners\UserAccountCreatedListener::class,);
        Event::listen(\App\Events\UserResetPassword::class, \App\Listeners\UserResetPasswordListener::class,);
        Event::listen(\App\Events\UserRegisterAccount::class, \App\Listeners\UserRegisterAccountListener::class,);
    }
}