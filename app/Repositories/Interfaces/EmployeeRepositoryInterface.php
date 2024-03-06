<?php

namespace App\Repositories\Interfaces;

Interface EmployeeRepositoryInterface {
    
    public function allEmployees();
    public function bannedEmployees();
    public function storeEmployee($data);
    public function findEmployee($id);
    public function destroyEmployee($id);

}
