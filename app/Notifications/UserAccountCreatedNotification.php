<?php
namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class UserAccountCreatedNotification extends Mailable
{
    use Queueable, SerializesModels;

    public $user;
    public $password;
    public $link;
    /**
     * Create a new message instance.
     */
    public function __construct($user, $password, $link)
    {
        $this->user = $user;
        $this->password = $password;
        $this->link = $link;
    }
    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            from: new Address(env('MAIL_FROM_ADDRESS'), env('MAIL_FROM_NAME')),
            subject: 'Zentra New Account Created',
        );
    }
    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.user-account-created',
            with: ['user' => $this->user, 'password' => $this->password, 'link' => $this->link],
        );
    }
    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}