<?php

namespace App\Repositories;

use App\Repositories\Interfaces\EmployeeRepositoryInterface;
use App\Models\Employee;
use Config;

class EmployeeRepository implements EmployeeRepositoryInterface{

    public function allEmployees($request){
        $state = Config::get('constants.EMPLOYEE_STATUS.active');
      
        $employees = Employee::where('status',$state)->where('is_working','1')->orderby('id','desc');

        $columns = ['name_ar','name_en','email','mobile','national_id','qualification'];
        foreach($columns as $col){
            $fetch = $request->$col;
            if(!empty($fetch)){
                $employees = $employees->where(function($q) use($columns,$fetch){
                    foreach($columns as $c){
                        $q = $q->orwhere($c,'like',"%".$fetch."%");
                    }
                });
                
                
            }
        }

        $employees = $employees->wherehas('job',function($q) use($request){
            $columns = ['job_title','job_description','job_id'];
            foreach($columns as $col){
                $fetch = $request->$col;
                if($col == 'job_id' )
                    $col = 'job_title';
                if(!empty($fetch)){
                    $q = $q->where($col,'like',"%".$fetch."%");
                }
            }
            return $q;
        });


        $employees = $employees->paginate();
    }

    public function storeEmployee($data){
        return Employee::create($data);
    }

    public function findEmployee($id){
        return Employee::find($id);
    }

    public function bannedEmployees(){
        $state = Config::get('constants.EMPLOYEE_STATUS.banned');
        $employees = Employee::where('status',$state)->where('is_working','0')->orderby('id','desc')->paginate();
    }


    public function destroyEmployee($id){
        $Employee = Employee::find($id);
        $Employee->delete();
    }
}