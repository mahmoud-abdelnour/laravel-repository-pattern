<?php

namespace App\Repositories;

use App\Repositories\Interfaces\UserRepositoryInterface;
use App\Models\User;

class UserRepository implements UserRepositoryInterface{

    public function allUsers($request){
        $users = User::latest();
		$columns = ['name'];
        foreach($columns as $col){
            $fetch = $request->$col;
            if(!empty($fetch)){
                $columns = $columns->where($col,'like',"%".$fetch."%");
            }
        }
		$users = $users->paginate();
        return $users;
    }

    public function createUser($data){
        return User::create($data);
    }

    public function findUser($id){
        return User::find($id);
    }
    public function updateUser($id,$data){
        $user = User::where('id', $id)->first();
        $user->update($data);
        return $user;
    }
    
    public function destroyUser($id){
        $user = User::find($id);
        $user->delete();
    }
}