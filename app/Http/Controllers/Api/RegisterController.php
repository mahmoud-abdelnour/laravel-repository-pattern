<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Models\Product;
use Auth;
use Carbon\Carbon;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;

use App\Models\Employee;
use App\Models\User;
use App\Models\Company;

use App\Repositories\Interfaces\CompanyRepositoryInterface;
use App\Repositories\Interfaces\EmployeeRepositoryInterface;

class RegisterController extends Controller{
    
    private $CompanyRepositoryInterface;
    private $EmployeeRepositoryInterface;

    public function __construct(CompanyRepositoryInterface $CompanyRepositoryInterface,
                                EmployeeRepositoryInterface $EmployeeRepositoryInterface){

        $this->CompanyRepositoryInterface = $CompanyRepositoryInterface;
        $this->EmployeeRepositoryInterface = $EmployeeRepositoryInterface;
    }

    function registerEmployee(Request $request){
      
        $validator = Validator::make($request->all(), [
            'name_ar' => ['required', 'string', 'max:255'],
            'name_en' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            //'password' => ['required', 'string', 'min:8', 'confirmed'],
            'password' => ['required', 'string', 'confirmed'],
            'mobile' => ['required', 'string','unique:users'],
            'national_id' => ['required', 'string','unique:users'],
            'qualification' => ['required', 'string'],
            'gender' => ['required'],
            'martial_status' => ['required'],
            'bank_name' => ['required', 'string'],
            'bank_ipan' => ['required', 'string'],
            'qualification_file' => ['required', 'file'],
            'national_address_file' => ['required', 'file'],
            'bank_ipan_file' => ['required', 'file'],
            'national_id_file' => ['required', 'file'],
            'secret_approvement_file' => ['required', 'file'],
            //'electronic_signature_file' => ['required', 'file'],
            //'electronic_signature_approval' => ['required'],
            
            'user_type' => ['required'],
        ],
        [
        ]);


        $response = array('response' => '', 'success' => false, 'code'=>'405');
        if ($validator->fails()) {
            $response['errors'] = $validator->messages();
        } else {
            $user_type = $request->user_type;

            $name_en = $request->name_en;
            $name_ar = $request->name_ar;
            $email = $request->email;
            $password = $request->password;
            $password_confirmation = $request->password_confirmation;
            $mobile = $request->mobile;
            $national_id = $request->national_id;
            $qualification = $request->qualification;
            $gender = $request->gender;
            $martial_status = $request->martial_status;
            $national_address_building_no = $request->national_address_building_no;
            $national_address_postal = $request->national_address_postal;
            $national_address_extra = $request->national_address_extra;
            $bank_name = $request->bank_name;
            $bank_ipan = $request->bank_ipan;
            $qualification_file = $request->qualification_file;
            $national_address_file = $request->national_address_file;
            $bank_ipan_file = $request->bank_ipan_file;
            $national_id_file = $request->national_id_file;
            $electronic_signature_approval = $request->electronic_signature_approval?1:0;
            $secret_approvement_file = $request->secret_approvement_file;
            $registered_in_remote_work_platform = $request->registered_in_remote_work_platform;
            

            $files = $request->files;
            foreach($files as $key=>$file){
                $file_name = time().'_'.$file->getClientOriginalName();
                $file_name = str_replace(" ","-",$file_name); 
                $file_name = uniqid().'_'.$file_name;
                $$key = "app/public/files/".$file_name;
                $file->move('storage/app/public/files/',$file_name);
            }



            if($user_type == 'employee'){
                $employee = $this->EmployeeRepositoryInterface->storeEmployee([
                    'name_en'=>$name_en,
                    'name_ar'=>$name_ar,
                    'email'=>$email,
                    'mobile'=>$mobile,
                    'national_id'=>$national_id,
                    'qualification'=>$qualification,
                    'gender'=>$gender,
                    'martial_status'=>$martial_status,
                    'national_address_building_no'=>$national_address_building_no,
                    'national_address_postal'=>$national_address_postal,
                    'national_address_extra'=>$national_address_extra,
                    'bank_name'=>$bank_name,
                    'bank_ipan'=>$bank_ipan?'SA'.$bank_ipan:'',
                    'national_id_file'=>$national_id_file,
                    'qualification_file'=>$qualification_file,
                    'national_address_file'=>$national_address_file,
                    'bank_ipan_file'=>$bank_ipan_file,
                    'registered_in_remote_work_platform'=>$registered_in_remote_work_platform,
                    'electronic_signature_approval'=>$electronic_signature_approval,
                    'secret_approvement_file'=>$secret_approvement_file,
                    'electronic_signature_file'=>$electronic_signature_file,
                ]);


                $response['employee'] = $employee;
                $response['response'] = 'created_successfully';
                $response['success'] = true;
            }
        }

        return $response;
    }




    function registerCompany(Request $request){
        $validator = Validator::make($request->all(), [
            'name_ar' => ['required', 'string', 'max:255'],
            'name_en' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'confirmed'],
            'mobile' => ['required', 'string','unique:users'],
            'commercial_record' => ['required', 'string'],
            'national_address_building_no' => ['required', 'string'],
            'national_address_postal' => ['required'],
            'national_address_extra' => ['required'],
            'labor_office_company_id' => ['required', 'string'],
            'insurance_office_company_id' => ['required', 'string'],
            'commercial_record_file' => ['required', 'file'],
            'tax_registration_certificate_file' => ['required', 'file'],
            'national_address_file' => ['required', 'file'],
            'user_type' => ['required'],
        ],
        [

        ]);


        $response = array('response' => '', 'success' => false, 'code'=>'405');
        if ($validator->fails()) {
            $response['errors'] = $validator->messages();
        } else {
            $user_type = $request->user_type;

            $name_en = $request->name_en;
            $name_ar = $request->name_ar;
            $email = $request->email;
            $password = $request->password;
            $password_confirmation = $request->password_confirmation;
            $mobile = $request->mobile;
            $commercial_record = $request->commercial_record;
            $national_address_building_no = $request->national_address_building_no;
            $national_address_postal = $request->national_address_postal;
            $national_address_extra = $request->national_address_extra;
            $labor_office_company_id = $request->labor_office_company_id;
            $insurance_office_company_id = $request->insurance_office_company_id;
            $commercial_record_file = $request->commercial_record_file;
            $tax_registration_certificate_file = $request->tax_registration_certificate_file;
            $national_address_file = $request->national_address_file;
            

            $files = $request->files;
            foreach($files as $key=>$file){
                $file_name = time().'_'.$file->getClientOriginalName();
                $file_name = str_replace(" ","-",$file_name); 
                $file_name = uniqid().'_'.$file_name;
                $$key = "app/public/files/".$file_name;
                $file->move('storage/app/public/files/',$file_name);
            }



            if($user_type == 'company'){
                $company = $this->CompanyRepositoryInterface->storeCompany([
                    'name_en'=>$name_en,
                    'name_ar'=>$name_ar,
                    'email'=>$email,
                    'mobile'=>$mobile,
                    'commercial_record'=>$commercial_record,
                    'national_address_building_no'=>$national_address_building_no,
                    'national_address_postal'=>$national_address_postal,
                    'national_address_extra'=>$national_address_extra,
                    'labor_office_company_id'=>$labor_office_company_id,
                    'insurance_office_company_id'=>$insurance_office_company_id,
                    'commercial_record_file'=>$commercial_record_file,
                    'tax_registration_certificate_file'=>$tax_registration_certificate_file,
                    'national_address_file'=>$national_address_file,
                ]);

                
                $response['response'] = 'created_successfully';
                $response['company'] = $company;
                $response['success'] = true;
                $response['code'] = '200';
            }
        }

        return $response;
    }


  

}
