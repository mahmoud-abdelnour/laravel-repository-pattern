<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Paginatable;
use Config;
use App\Models\EmpTask;

class Job extends Model
{
    use HasFactory,Paginatable;
    
    //protected $appends  = ['assigned_tasks'];

    function tasks(){
        return $this->belongsToMany('App\Models\Task','tasks_jobs');
    }


    function employees(){
        $state = Config::get('constants.EMPLOYEE_STATUS.active');
        return $this->hasMany('App\Models\Employee')->where('is_working',1)->where('status',$state);
    }


    function nominations(){
        return $this->hasMany('App\Models\JobRequest');
    }


    function assigned_tasks(){
        if(!empty($this->id)){
            return EmpTask::with(['company','employee','task'])->whereRaw("emp_id IN (SELECT id FROM employees WHERE job_id = '".$this->id."' )");
        }
    }

    function getAssignedTasksAttribute(){
        return $this->assigned_tasks()->get();
    }
    
}
  
