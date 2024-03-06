<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Paginatable;

class Course extends Model
{
    use HasFactory,Paginatable;
    protected $guarded = [];

    
    function emp_courses(){
        return $this->hasMany('App\Models\EmpCourse');
    }
}
  
