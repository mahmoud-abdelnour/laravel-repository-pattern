<?php

namespace App\Repositories\Interfaces;

Interface PermissionRepositoryInterface {
    
    public function allPermissions($request);
    public function storePermission($data);
    public function updatePermission($id,$data);
    public function findPermission($id);
    public function destroyPermission($id);

}
