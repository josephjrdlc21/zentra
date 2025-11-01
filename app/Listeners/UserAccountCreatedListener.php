<?php

namespace App\Listeners;

use App\Events\UserAccountCreated;
use App\Notifications\UserAccountCreatedNotification;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Mail;

class UserAccountCreatedListener implements ShouldQueue
{
    use InteractsWithQueue;
    /**
     * Handle the event.
     */
    public function handle(UserAccountCreated $event)
    {
        Mail::to($event->user->email)->send(
            new UserAccountCreatedNotification($event->user, $event->password, $event->link)
        );
    }
}