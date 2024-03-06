<?php

namespace App\Repositories\Interfaces;

Interface CourseRepositoryInterface {
    
    public function allCourses($request);
    public function storeCourse($data);
    public function updateCourse($id,$data);
    public function findCourse($id);
    public function destroyCourse($id);

}
