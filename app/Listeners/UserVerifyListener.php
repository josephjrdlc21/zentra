<?php

namespace App\Listeners;

use App\Events\UserVerifyEvent;
use App\Notifications\UserVerifyNotification;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Mail;

class UserVerifyListener implements ShouldQueue
{
    use InteractsWithQueue;
    /**
     * Handle the event.
     */
    public function handle(UserVerifyEvent $event)
    {
        Mail::to($event->customer->email)->send(new UserVerifyNotification($event->customer, $event->token));
    }
}