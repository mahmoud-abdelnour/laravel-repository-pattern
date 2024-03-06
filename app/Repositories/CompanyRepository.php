<?php

namespace App\Repositories;

use App\Repositories\Interfaces\CompanyRepositoryInterface;
use App\Models\Company;
use Config;

class CompanyRepository implements CompanyRepositoryInterface{

    public function allCompanies($request){
        $state = Config::get('constants.COMPANY_STATUS.active');
        $companies = Company::where('status',$state)->latest();
        $columns = ['name_ar','name_en','email','commercial_record','mobile'];
        foreach($columns as $col){
            $fetch = $request->$col;
            if(!empty($fetch)){
                $companies = $companies->where($col,'like',"%".$fetch."%");
            }
        }
        $companies = $companies->paginate();
        return $companies;
    }

    public function storeCompany($data){
        return Company::create($data);
    }

    public function findCompany($id){
        return Company::find($id);
    }

 

    public function destroyCompany($id){
        $Company = Company::find($id);
        $Company->delete();
    }
}