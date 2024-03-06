<?php 

use App\Models\User;

class Helper{
    
    public static function super_admins(){
        return  $super_admins = User::whereHas("roles", function($q){ $q->where("name", "super_admin"); })->get();
    }


    public static function enum(){
        $file =  \File::get(storage_path('app/public/enum'));
        $data = json_decode($file, true);
        return $data;
    }

}
