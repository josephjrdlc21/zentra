<?php

namespace App\Providers;

use App\Support\CustomValidator;

use Illuminate\Support\Facades\Validator;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        /**
         * Secure the assets when https.
         */
        if(env('SECURE_ASSET',FALSE) == TRUE){
            $this->app['request']->server->set('HTTPS','on');
        }

        /**
         * Custom validation configuration.
         */
        Validator::resolver(function($translator, $data, $rules, $messages)
        {
            return new CustomValidator($translator, $data, $rules, $messages);
        });
    }
}
