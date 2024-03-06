<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class CommonNotification extends Notification{

    use Queueable;

    private $data;

  
    public function __construct($data){
        $this->data = $data;
    }

   
    public function via($notifiable){
        return ['mail','database'];
    }

    public function routeNotificationForMail(){
        return $this->payer_email;
    }
    
    public function toMail($notifiable){
        $notification_type = $this->data['notification_type'];
        switch($notification_type){

            case("CompanyRequestEmp"):
                return (new MailMessage)
                    ->view('emails.CompanyRequestEmp',$this->data)
                    ->subject($this->data['heading']);
            break;

            case("ProviderNominateEmp"):
                return (new MailMessage)
                    ->view('emails.ProviderNominateEmp',$this->data)
                    ->subject($this->data['heading']);
            break;

            case("CompanyAdmitNomination"):
                return (new MailMessage)
                    ->view('emails.CompanyAdmitNomination',$this->data)
                    ->subject($this->data['heading']);
            break;

            case("EmpAdmitNomination"):
                return (new MailMessage)
                    ->view('emails.EmpAdmitNomination',$this->data)
                    ->subject($this->data['heading']);
            break;

            case("ProviderAdmitInsurance"):
                return (new MailMessage)
                    ->view('emails.ProviderAdmitInsurance',$this->data)
                    ->subject($this->data['heading']);
            break;

            case("ProviderAdmitJobRequest"):
                return (new MailMessage)
                    ->view('emails.ProviderAdmitJobRequest',$this->data)
                    ->subject($this->data['heading']);
            break;

            case("ProviderAdmitEmployee"):
                return (new MailMessage)
                    ->view('emails.ProviderAdmitEmployee',$this->data)
                    ->subject($this->data['heading']);
            break;

            case("ProviderSuggestedCourses"):
                return (new MailMessage)
                    ->view('emails.ProviderSuggestedCourses',$this->data)
                    ->subject($this->data['heading']);
            break;

            case("CompanyAssignTask"):
                return (new MailMessage)
                    ->view('emails.CompanyAssignTask',$this->data)
                    ->subject($this->data['heading']);
            break;

        }        
    }
    
    public function toDatabase($notifiable){
        return $this->data;
        
    }

}
