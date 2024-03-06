<?php

namespace App\Repositories;

use App\Repositories\Interfaces\CourseRepositoryInterface;
use App\Models\Course;
use Config;

class CourseRepository implements CourseRepositoryInterface{

    public function allCourses($request){
        $courses = Course::where(function($q) use($course_title){
            if(!empty($course_title)){
                 return $q->where('course_title','like',"%".$course_title."%");
            }
        })->paginate();
        return $courses;
    }

    public function storeCourse($data){
        return Course::create($data);
    }

    public function findCourse($id){
        return Course::find($id);
    }
    public function updateCourse($id,$data){
        $Course = Course::where('id', $id)->first();
        $Course->update($data);
        return $Course;
    }
    
    public function destroyCourse($id){
        $Course = Course::find($id);
        $Course->delete();
    }
}