<?php

namespace App\Repositories;

use App\Repositories\Interfaces\PermissionRepositoryInterface;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class PermissionRepository implements PermissionRepositoryInterface{

    public function allPermissions($request){
        $permissions = Permission::paginate();
        return $permissions;
    }

    public function storePermission($data){
        return Permission::create($data);
    }

    public function findPermission($id){
        return Permission::find($id);
    }
    public function updatePermission($id,$data){
        $permission = Permission::where('id', $id)->first();
        $permission->update($data);
        return $permission;
    }
    
    public function destroyPermission($id){
        $permission = Permission::find($id);
        $permission->delete();
    }
}