<?php

namespace App\Events;

use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;

class UserAccountCreated
{
    use Dispatchable, SerializesModels;
    
    public $user;
    public $password;
    public $link;

    /**
     * Create a new event instance.
     */
    public function __construct($user, $password, $link)
    {
        $this->user = $user;
        $this->password = $password;
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