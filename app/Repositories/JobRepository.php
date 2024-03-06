<?php

namespace App\Repositories;

use App\Repositories\Interfaces\JobRepositoryInterface;
use App\Models\Job;
use Config;

class JobRepository implements JobRepositoryInterface{

    public function allJobs($request){
        $jobs = Job::withCount('employees');
        $columns = ['job_title','job_description'];
        foreach($columns as $col){
            $fetch = $request->$col;
            if(!empty($fetch)){
                $jobs = $jobs->where($col,'like',"%".$fetch."%");
            }
        }
        $jobs = $jobs->paginate();
        return $jobs;
    }

    public function storeJob($data){
        return Job::create($data);
    }

    public function findJob($id){
        return Job::find($id);
    }
    public function updateJob($id,$data){
        $job = Job::where('id', $id)->first();
        $job->update($data);
        return $job;
    }
    
    public function destroyJob($id){
        $job = Job::find($id);
        $job->delete();
    }
}