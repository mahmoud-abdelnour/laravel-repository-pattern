<?php

namespace App\Repositories;

use App\Repositories\Interfaces\RoleRepositoryInterface;
use Spatie\Permission\Models\Role;

class RoleRepository implements RoleRepositoryInterface{

    public function allRoles($request){
        $roles = Role::latest();
		$columns = ['name'];
        foreach($columns as $col){
            $fetch = $request->$col;
            if(!empty($fetch)){
                $roles = $roles->where($col,'like',"%".$fetch."%");
            }
        }
		$roles = $roles->paginate();
        return $roles;
    }

    public function storeRole($data){
        return Role::create($data);
    }

    public function findRole($id){
        return Role::find($id);
    }
    public function updateRole($id,$data){
        $role = Role::where('id', $id)->first();
        $role->update($data);
        return $permission;
    }
    
    public function destroyRole($id){
        $role = Role::find($id);
        $role->delete();
    }
}