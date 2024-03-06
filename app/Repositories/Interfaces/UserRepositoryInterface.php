<?php

namespace App\Repositories\Interfaces;

Interface UserRepositoryInterface {
    
    public function allUsers($request);
    public function createUser($data);
    public function updateUser($id,$data);
    public function findUser($id);
    public function destroyUser($id);

}
