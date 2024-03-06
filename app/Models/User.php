<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;
use App\Traits\Paginatable;
use App\Notifications\ResetPasswordNotification;


class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles,Paginatable;
    protected $guarded = [];
    protected $guard_name = 'api';
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'user_name',
        'email',
        'password',
        'national_id',
        'user_type',        
        'mobile'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
    
   /*  function getEmailAttribute(){
        return 'mahmoud.abdelnour@yahoo.com';
    } */


    public function sendPasswordResetNotification($token){ 
       $this->notify(new ResetPasswordNotification($token));
    }


    function entity(){
        if($this->user_type == 'employee'){
            return $this->hasOne('App\Models\Employee');
        }elseif($this->user_type == 'company'){
            return $this->hasOne('App\Models\Company');
        }else{
            return $this->hasOne('App\Models\User','id');
        }
    }
    

    function inbox(){
        if($this->type == 'provider'){
            return $this->hasMany('App\Models\Message','message_to')->orwhere('to_type','provider');
        }else{
            return $this->hasMany('App\Models\Message','message_to');
        }
    }


    function sent(){
        return $this->hasMany('App\Models\Message','message_from');
    }

    
}
