<?php

namespace App\Http\Middleware;

use App\Providers\RouteServiceProvider;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Attendance;
use App\Models\Setting;

class Custom
{
    
    public function handle(Request $request, Closure $next, ...$guards){

        if($request->expectsJson()) {
            if(Auth::user()){
                $user = Auth::user();
                if($user->entity())
                    $entity = $user->entity;


                $settings = Setting::first();
                $day = date('D');
                $holydays = ["Fri","Sat"];
                              
                if($user->user_type == 'employee' && $entity && $settings->task_assign_method != 'automatic'){
                    $today = date('Y-m-d');
                    $attendance = Attendance::whereRaw(" DATE_FORMAT(check_in, '%Y-%m-%d') = '".$today."' ")->where('emp_id',$entity->id)->first();
                    if(!$attendance){
                        $checkin_date = date('Y-m-d H:i');
                        Attendance::create([
                            'emp_id'=>$entity->id,
                            'check_in'=>$checkin_date,
                            'attendance_type'=>'manual'
                        ]); 
                    }else{
                        $checkout_date = date('Y-m-d H:i');
                        $attendance->update([
                            'check_out'=>$checkout_date,
                        ]);
                    }
                }
            }
        }

        

        return $next($request);
    }
}
