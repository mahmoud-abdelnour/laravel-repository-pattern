<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class NewRegistrationNotification extends Notification{

    use Queueable;

    private $data;

  
    public function __construct($data){
        $this->data = $data;
    }

   
    public function via($notifiable){
        return ['mail','database'];
    }

    public function toMail($notifiable){
      
        return (new MailMessage)
            ->view('emails.NewRegistration',$this->data)
            ->subject($this->data['heading']);
                  
    }
    
    public function toDatabase($notifiable){

        return $this->data;
        
    }

}
