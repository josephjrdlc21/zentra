<?php

namespace App\Listeners;

use App\Events\UserRegisterAccount;
use App\Notifications\UserRegisterAccountNotification;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Mail;

class UserRegisterAccountListener implements ShouldQueue
{
    use InteractsWithQueue;
    /**
     * Handle the event.
     */
    public function handle(UserRegisterAccount $event)
    {
        Mail::to($event->user->email)->send(
            new UserRegisterAccountNotification($event->user, $event->link)
        );
    }
}