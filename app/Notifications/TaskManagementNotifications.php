<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class TaskManagementNotifications extends Notification{

    use Queueable;

    private $data;

  
    public function __construct($data){
        $this->data = $data;
    }

   
    public function via($notifiable){
        return ['database'];
    }

    
    public function toDatabase($notifiable){
        return $this->data;
    }

}
