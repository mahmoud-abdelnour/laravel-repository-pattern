<?php

namespace App\Repositories\Interfaces;

Interface CompanyRepositoryInterface {
    
    public function allCompanies();
    public function storeCompany($data);
    public function findCompany($id);
    public function destroyCompany($id);

}
