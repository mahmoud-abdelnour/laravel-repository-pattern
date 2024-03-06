<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\Pivot;

class EmpCourse extends Pivot{
    protected $table = 'emp_courses';
    

    function employee(){
        return $this->belongsTo('App\Models\Employee','emp_id');
    }

    function course(){
        return $this->belongsTo('App\Models\Course','course_id');
    }
}

  
