<?php

namespace App\Repositories\Interfaces;

Interface JobRepositoryInterface {
    
    public function allJobs($request);
    public function storeJob($data);
    public function updateJob($id,$data);
    public function findJob($id);
    public function destroyJob($id);

}
