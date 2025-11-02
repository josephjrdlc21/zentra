<?php

namespace App\Events;

use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;

class UserRegisterAccount
{
    use Dispatchable, SerializesModels;
    
    public $user;
    public $link;

    /**
     * Create a new event instance.
     */
    public function __construct($user, $link)
    {
        $this->user = $user;
        $this->link = $link;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [
        ];
    }
}