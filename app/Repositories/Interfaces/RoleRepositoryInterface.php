<?php

namespace App\Repositories\Interfaces;

Interface RoleRepositoryInterface {
    
    public function allRoles($request);
    public function storeRole($data);
    public function updateRole($id,$data);
    public function findRole($id);
    public function destroyRole($id);

}
