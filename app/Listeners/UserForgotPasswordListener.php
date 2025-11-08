<?php

namespace App\Listeners;

use App\Events\UserForgotPassword;
use App\Notifications\UserForgotPasswordNotification;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Mail;

class UserForgotPasswordListener implements ShouldQueue
{
    use InteractsWithQueue;
    /**
     * Handle the event.
     */
    public function handle(UserForgotPassword $event)
    {
        Mail::to($event->user->email)->send(
            new UserForgotPasswordNotification($event->user, $event->link)
        );
    }
}