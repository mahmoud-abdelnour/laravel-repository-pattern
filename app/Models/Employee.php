<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\EmpTask;
use Config;
use App\Traits\Paginatable;

class Employee extends Model{
    use HasFactory,Paginatable;

    protected $guarded = [];
    protected $appends  = [
        'national_address_file_url','qualification_file_url',
        'national_address_file_url','bank_ipan_file_url','secret_approvement_file_url','national_id_file_url',
        'state',
        'abilities',
        //'counters',
        //'approved_by_user','has_resigns','current_resigns','current_resigns_count'
    ];
   
  
    function user(){
        return $this->belongsTo('App\Models\User');
    }

    function job(){
        return $this->belongsTo('App\Models\Job');
    }

    function subscriptions(){
        return $this->hasMany('App\Models\EmpSubscription','emp_id');
    }

    function resigns(){
        return $this->hasMany('App\Models\Resign','emp_id');
    }
    
    function mebmership_subscription(){
        return $this->subscriptions()->where('subscription_type','membership');
    }

    function current_mebmership_subscription(){
        $state = Config::get('constants.EMP_SUBSCRIPTION_APPROVE.rejected');
        return $this->mebmership_subscription()->where('year',date('Y'))->where('is_approved','!=',$state);
    }

    function current_month_subscription(){
        $state = Config::get('constants.EMP_SUBSCRIPTION_APPROVE.rejected');
        $month = ltrim(date("m"), "0");


        return $this->subscriptions()
        ->where('subscription_type','courses')
        ->where('year',date('Y'))
        ->where("month",$month)
        ->where('is_approved','!=',$state);
    }

    function suggestedCourses(){
        return $this->belongsToMany('App\Models\Course','emp_courses','emp_id','course_id')
        ->withpivot('approved')
        ->withpivot('created_at');
    }


    function nominations(){
        return $this->belongsToMany('App\Models\JobRequest','job_request_candidates','emp_id','job_request_id')
        ->withpivot('emp_response_status')
        ->withpivot('id')
        ->withpivot('company_response_status')
        ->with(['job','company']);
    }

    /* function tasks(){
       return $this->belongsToMany('App\Models\Task','App\Models\EmpTask','emp_id','task_id')->withPivot('company_id');
    } */

    function tasks(){
        return $this->hasMany('App\Models\EmpTask','emp_id');
    }

    function courses(){
        return $this->hasMany('App\Models\EmpCourse','emp_id');
    }
    

    function companies(){
        return $this->belongsToMany('App\Models\Company','company_emp','emp_id','company_id');
    }

    function current_jobs(){
        return $this->hasMany('App\Models\CompanyEmp','emp_id')->where('is_working','1');
    }

    function getCurrentJobAttribute(){
        return $this->current_jobs->first();
    }

    function company(){
        return $this->belongsTo('App\Models\Company');
    }

    function insurances(){
        return $this->hasMany('App\Models\Insurance','emp_id');
    }

    function insurance(){
        return $this->hasOne('App\Models\Insurance','emp_id');
    }

    function sentMessages(){

    }

    function inboxMessages(){
        
    }

    function notifications(){
        
    }


    function ApprovedBy(){
        return $this->belongsTo('App\Models\User','approved_by');
    }

    function getApprovedByUserAttribute(){
        return  $this->ApprovedBy->name;
    }


    public function  getNationalIdFileUrlAttribute($key){

        return \Storage::disk('public')->url($this->national_id_file);
    }

    public function  getQualificationFileUrlAttribute($key){
        return \Storage::disk('public')->url($this->qualification_file);
    }

    public function  getNationalAddressFileUrlAttribute($key){
        return \Storage::disk('public')->url($this->national_address_file);
    }

    public function  getBankIpanFileUrlAttribute($key){
        return \Storage::disk('public')->url($this->bank_ipan_file);
    }
    
    public function  getSecretApprovementFileUrlAttribute($key){
        return \Storage::disk('public')->url($this->secret_approvement_file);
    }


    function getStateAttribute(){
        $STATUS_PENDING = Config::get('constants.EMPLOYEE_STATUS.pending');
        $STATUS_ACTIVE = Config::get('constants.EMPLOYEE_STATUS.active');
        $STATUS_BANNED = Config::get('constants.EMPLOYEE_STATUS.banned');
        $COMPANY_SUBSCRIPTION_APPROVE = Config::get('constants.COMPANY_SUBSCRIPTION_APPROVE.approved');
        
        $status = $this->status;
       
        $year = date('Y');
        $subscription = $this->mebmership_subscription->where('is_approved',$COMPANY_SUBSCRIPTION_APPROVE)->where('year',$year)->first();
        $states = [];

        if($status == $STATUS_PENDING){
            $states[] = ['text'=>'تحت المراجعة','color'=>'danger'];
        }

        if($subscription){
            $states[] = ['text'=>'تم السداد','color'=>'success'];
        }

        if($status == $STATUS_ACTIVE){
            $states[] = ['text'=>'تم المراجعة','color'=>'success'];
        }

        if($status == $STATUS_ACTIVE){
            $states[] = ['text'=>'تم الإعتماد','color'=>'success'];
        }

        if(!$subscription){
            $states[] = ['text'=>'لم يتم السداد','color'=>'danger'];
        }

        if($status == $STATUS_BANNED){
            $states[] = ['text'=>'محظور','color'=>'danger'];
        }

        return $states;

    }


    //function getCountersAttribute(){
    function Counters(){
        $nominations = $this->nominations()->count();
        $tasks = $this->tasks()->count();
        $courses = $this->courses()->count();
        $cards['tasks'] = $tasks;
        $cards['nominations'] = $nominations;
        $cards['courses'] = $courses;
        return $cards;
    }

    function getAbilitiesAttribute(){
        $status = $this->status;
        $is_working = $this->is_working;
        $STATUS_ACTIVE = Config::get('constants.EMPLOYEE_STATUS.active');

        $current_mebmership_subscription = $this->current_mebmership_subscription->count();
        $current_month_subscriptions = $this->current_month_subscription->count();
        

        $abilities = [
            'can_view_courses'=> false,
            'can_send_message'=> false,
            'can_view_tasks'=> false,
            'can_view_nominations'=> true,
            'can_view_payments'=> false,
            'can_view_resigns'=> false,
            'can_view_attendances'=> false,
            
            'can_pay_monthly_course'=> $current_month_subscriptions == 0,
            'can_pay_membership'=> $current_mebmership_subscription == 0,
            
        ];

        if($status == $STATUS_ACTIVE && $is_working == 1){
            $abilities['can_view_courses'] = true;
            $abilities['can_send_message'] = true;
            $abilities['can_view_tasks'] = true;
            $abilities['can_view_nominations'] = true;

            $abilities['can_view_payments'] = true;
            $abilities['can_view_resigns'] = true;
            $abilities['can_view_attendances'] = true;
        }

        if($status == $STATUS_ACTIVE ){
            $abilities['can_view_nominations'] = true;
        }

        return $abilities;
    }


    /* function getHasResignsAttribute(){
        $company_id = $this->company_id;
        $current_job = $this->CurrentJob;
        $job_request_id = $current_job->job_request_id;
        return $this->resigns()->where([
            'company_id' => $company_id,
            'job_request_id' => $job_request_id,
        ])->get();
    } */

    function getCurrentResignsCountAttribute(){
        return $this->CurrentResigns->count();
    }

    /* function getCurrentResignsAttribute(){
        return $this->CurrentResigns->count();
    } */

    function CurrentResigns(){
        $company_id = $this->company_id;
        $current_job = $this->CurrentJob;
        $job_request_id = $current_job->job_request_id;
        return $this->resigns()->where([
            'company_id' => $company_id,
            'job_request_id' => $job_request_id,
        ]);
    }

    function attendances(){
        return $this->hasMany('App\Models\Attendance','emp_id');
    }

    function AssignedTasks($params = []){
        $tasks = $this->tasks();
        if(!empty($params['date_from']) && !empty($params['date_to']) ){
            $tasks = $tasks->whereRaw("DATE_FORMAT(created_at, '%Y-%m-%d') >= '".$params['date_from']."'")
                           ->whereRaw("DATE_FORMAT(created_at, '%Y-%m-%d') <= '".$params['date_to']."'");
        }elseif(!empty($params['date_from'])){
            $tasks = $tasks->whereRaw("DATE_FORMAT(created_at, '%Y-%m-%d') >= '".$params['date_from']."'");
        }elseif(!empty($params['date_to'])){
            $tasks = $tasks->whereRaw("DATE_FORMAT(created_at, '%Y-%m-%d') <= '".$params['date_to']."'");
        }
        //$tasks = $tasks->get();
        return $tasks;
    }

    function CompletedTasks($params = []){
        $CompletedTasks = $this->AssignedTasks($params);
        $CompletedTasks = $CompletedTasks->WhereNotNull('finished_at');
        //$CompletedTasks = $CompletedTasks->get();
        return $CompletedTasks;
    }

    function TotalWorkTime($params = []){
        $attendances = $this->attendances();
        if(!empty($params['date_from']) && !empty($params['date_to']) ){
            $attendances = $attendances->whereRaw("DATE_FORMAT(created_at, '%Y-%m-%d') >= '".$params['date_from']."'")
                                       ->whereRaw("DATE_FORMAT(created_at, '%Y-%m-%d') <= '".$params['date_to']."'");
        }elseif(!empty($params['date_from'])){
            $attendances = $attendances->whereRaw("DATE_FORMAT(created_at, '%Y-%m-%d') >= '".$params['date_from']."'");
        }elseif(!empty($params['date_to'])){
            $attendances = $attendances->whereRaw("DATE_FORMAT(created_at, '%Y-%m-%d') <= '".$params['date_to']."'");
        }


        $diff = 0;
        $attendances = $attendances->get();
        foreach($attendances as $v){
            $checkin = $v->check_in;
            $checkout = $v->check_out;
            if(!empty($checkin) && !empty($checkout)){
                $checkin_ = strtotime($checkin);
                $checkout_ = strtotime($checkout);
                $diff += $checkout_ - $checkin_;
            }
        }
        $diff = round($diff/60/60,2);
        $data = [
            'diff' => $diff,
            'attendances' => $attendances
        ];
        return $data;
    }


    function LogCounts($params = []){
        $attendances = $this->attendances();
        if(!empty($params['date_from']) && !empty($params['date_to']) ){
            $attendances = $attendances->whereRaw("DATE_FORMAT(created_at, '%Y-%m-%d') >= '".$params['date_from']."'")
                                       ->whereRaw("DATE_FORMAT(created_at, '%Y-%m-%d') <= '".$params['date_to']."'");
        }elseif(!empty($params['date_from'])){
            $attendances = $attendances->whereRaw("DATE_FORMAT(created_at, '%Y-%m-%d') >= '".$params['date_from']."'");
        }elseif(!empty($params['date_to'])){
            $attendances = $attendances->whereRaw("DATE_FORMAT(created_at, '%Y-%m-%d') <= '".$params['date_to']."'");
        }

        $attendances_checkin  = $attendances->whereNotNull('check_in');
        $attendances_checkout = $attendances->whereNotNull('check_out');


        $attendances_checkin = $attendances_checkin->count();
        $attendances_checkout = $attendances_checkout->count();


        return ['attendances_checkin' => $attendances_checkin,'attendances_checkout' => $attendances_checkout];
    }



  /*   public function  getSecretApprovementFileAttribute($key){
        return \Storage::disk('public')->url($key);
    }  */
/* 
    
    public function  getNationalIdFileAttribute($key){
        return \Storage::disk('public')->url($key);
    }

    public function  getQualificationFileAttribute($key){
        return \Storage::disk('public')->url($key);
    }

    public function  getNationalAddressFileAttribute($key){
       
        return \Storage::disk('public')->url($key);
    }

    public function  getBankIpanFileAttribute($key){
        return \Storage::disk('public')->url($key);
    }
    
    public function  getSecretApprovementFileAttribute($key){
        return \Storage::disk('public')->url($key);
    } */
}
  
