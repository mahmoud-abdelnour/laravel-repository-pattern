<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use App\Traits\Paginatable;
use App\Models\Attendance;


use Config;
class Company extends Model{
    use HasFactory,Notifiable,Paginatable;

    protected $guarded = [];
    protected $appends  = ['commercial_record_file_url','tax_registration_certificate_file_url',
        'national_address_file_url','state',
        //'counters',
        'abilities','approved_by_user'
    ];
   
    function user(){
        return $this->belongsTo('App\Models\User');
    }

    function emp_requests(){
        return $this->hasMany('App\Models\JobRequest');
    }


    function employees(){
        return $this->belongsToMany('App\Models\Employee','company_emp','company_id','emp_id')
        ->where('employees.is_working',"1")->where('status','active')
        ->withpivot('work_start_date')
        ->withpivot('id')
        ->withpivot('note');
    }

    function candidates(){
        $candidates = [];
        foreach($this->emp_requests as $request){
            $candidates[] = $request->candidates;
        }
        return $candidates;
    }

    function tasks(){
        return $this->hasMany('App\Models\EmpTask','company_id')->with(['task','employee']);
    }

    function insurances(){
        return $this->hasMany('App\Models\Insurance','company_id')->with(['company','employee']);
    }

    function subscriptions(){
        return $this->hasMany('App\Models\CompanySubscription','company_id');
    }

    function current_mebmership_subscription(){
        $state = Config::get('constants.COMPANY_STATUS.active');
        return $this->subscriptions()->where('year',date('Y'))->where('state',$state);
    }

    function sentMessages(){

    }

    function inboxMessages(){
        
    }

    function notifications(){
        
    }


    public function  getCommercialRecordFileUrlAttribute($key){
        return \Storage::disk('public')->url($this->commercial_record_file);
    }

    public function  getTaxRegistrationCertificateFileUrlAttribute($key){
        return \Storage::disk('public')->url($this->tax_registration_certificate_file);
    }

    public function  getNationalAddressFileUrlAttribute($key){
        return \Storage::disk('public')->url($this->national_address_file);
    }

    function ApprovedBy(){
        return $this->belongsTo('App\Models\User','approved_by');
    }

    function getApprovedByUserAttribute(){
        return  $this->ApprovedBy->name;
    }

    function getStateAttribute(){
        $STATUS_PENDING = Config::get('constants.COMPANY_STATUS.pending');
        $STATUS_ACTIVE = Config::get('constants.COMPANY_STATUS.active');
        $STATUS_BANNED = Config::get('constants.COMPANY_STATUS.banned');
        $COMPANY_SUBSCRIPTION_APPROVE = Config::get('constants.COMPANY_SUBSCRIPTION_APPROVE.approved');
        
        $status = $this->status;
       
        $year = date('Y');
        $subscription = $this->subscriptions->where('is_approved',$COMPANY_SUBSCRIPTION_APPROVE)->where('year',$year)->first();
        $states = [];

        if($status == $STATUS_PENDING){
            $states[] = ['text'=>'تحت المراجعة','color'=>'danger'];
        }

        /*    if($subscription && $subscription->updated_at >= $this->approved_at  ){
            $states[] = ['text'=>'تم السداد','color'=>'success'];
        } */

        if($subscription){
            $states[] = ['text'=>'تم السداد','color'=>'success'];
        }

        if($status == $STATUS_ACTIVE){
            $states[] = ['text'=>'تم المراجعة','color'=>'success'];
        }

        if($status == $STATUS_ACTIVE){
            $states[] = ['text'=>'تم الإعتماد','color'=>'success'];
        }

        /* if($subscription &&  $subscription->updated_at < $this->approved_at  ){
            $states[] = ['text'=>'تم السداد','color'=>'success'];
        } */

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
        $candidates = count($this->candidates());
        $tasks = $this->tasks()->count();
        $employees = $this->employees()->count();
        $cards['tasks'] = $tasks;
        $cards['candidates'] = $candidates;
        $cards['employees'] = $employees;
        return $cards;
    }

    function getAbilitiesAttribute(){
        $status = $this->status;
        $STATUS_ACTIVE = Config::get('constants.COMPANY_STATUS.active');
        $abilities = [
            'can_view_emps'=> false,
            'can_view_job_request'=> false,
            'can_send_message'=> false,
            'can_view_tasks'=> false,
            'can_view_resigns'=> false,
            'can_view_attendances'=> false,
            'can_view_reports'=> false,
            
        ];

        if($status == $STATUS_ACTIVE){
            $abilities['can_view_emps'] = true;
            $abilities['can_view_job_request'] = true;
            $abilities['can_send_message'] = true;
            $abilities['can_view_tasks'] = true;
            $abilities['can_view_resigns'] = true;
            $abilities['can_view_attendances'] = true;
            $abilities['can_view_reports'] = true;
        }

        return $abilities;
    }

    function resigns(){
        return $this->hasMany('App\Models\Resign','company_id');
    }


    function attendances($paginate = true){
        $emp_ids = $this->employees->pluck('id')->toarray();
        //$emp_ids = $this->find(14)->employees->pluck('id')->toarray();
        //$emp_ids = [24,8];
        if(!empty($emp_ids)){
            $attendances = Attendance::with("employee")->whereIn("emp_id",$emp_ids)->orderby("check_in","desc");
            if($paginate){
                $attendances = $attendances->paginate();
            }

            return ($attendances);            
        }

    }
}
  
