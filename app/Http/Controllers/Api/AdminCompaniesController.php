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
use Illuminate\Validation\Rule;

use App\Models\Employee;
use App\Models\Company;
use App\Models\User;
use App\Models\CompanySubscription;

use Illuminate\Validation\Rules\Password;
use App\Notifications\NewRegistrationNotification;
use App\Repositories\Interfaces\CompanyRepositoryInterface;
use App\Repositories\Interfaces\UserRepositoryInterface;
use Config;
use DB;
use App\Models\JobRequest;
use App\Models\CompanyEmp;
use App\Notifications\CommonNotification;


class AdminCompaniesController extends Controller{

    private $CompanyRepositoryInterface;
    private $UserRepositoryInterface;
    
    public function __construct(CompanyRepositoryInterface $CompanyRepositoryInterface,UserRepositoryInterface $UserRepositoryInterface){
        $this->CompanyRepositoryInterface = $CompanyRepositoryInterface;
        $this->UserRepositoryInterface = $UserRepositoryInterface;
    }

    /**
     * @OA\Get(
     *     tags={"Provider Companies"},
     *     path="provider/companies",
     *     summary="Get all companies ",
     * 
     *     @OA\Response(
     *         response=200,
     *         description="OK",
     *         @OA\JsonContent(
     *             @OA\Examples(example="result", value={"data":{},"success": true}, summary="An result object."),
     *         )
     *     )
     * 
     * )
     */
    function index(Request $request){
        $companies = $this->CompanyRepositoryInterface->allCompanies($request);
        $response['success'] = true;
        $response['code'] = 200;
		return response()->json($companies,$response['code'] );
    }



    /**
     * @OA\Get(
     *     tags={"Provider Companies"},
     *     path="/provider/companies/{id}",
     *     summary="Get company ",
     * 
     *     @OA\Response(
     *         response=200,
     *         description="OK",
     *         @OA\JsonContent(
     *             @OA\Examples(example="result", value={"company":{},"success": true}, summary="An result object."),
     *         )
     *     )
     * 
     * )
     */
    function show($id){
		$response = array( 'success' => false, 'code'=>'405');
		if($id){
			$company = $this->CompanyRepositoryInterface->findCompany($id);
            if($company){
                $response['company'] = $company;
                $response['success'] = true;
                $response['code'] = 200;
            }else{
                $response['response'] = 'not_found';
                $response['success'] = true;
                $response['code'] = 200;
            }
		}
		return response()->json($response,$response['code'] );
	}



    /**
     * @OA\Get(
     *     tags={"Provider Companies"},
     *     path="/provider/companies/{id}/payments",
     *     summary="Get company payment",
     *     @OA\Parameter(
     *         description="Parameter with mutliple examples",
     *         in="path",
     *         name="id",
     *         required=true,
     *         @OA\Schema(type="string"),
     *         @OA\Examples(example="int", value="1", summary="An int value."),
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="OK",
     *         @OA\JsonContent(
     *             @OA\Examples(example="result", value={"job":{},"success": true}, summary="An result object."),
     *         )
     *     )
     * 
     * )
     */
    function payments(Request $request,$id){
        $response['response'] = 'not_found';
        $response['success'] = false;
        $response['code'] = 403;
        $subscriptions = 'not_found';
        $user = $request->user();
        $company = $this->CompanyRepositoryInterface->findCompany($id);
        if($company){
            $subscriptions = $company->subscriptions()->paginate();
            $response['success'] = true;
            $response['code'] = 200;
            $response['subscriptions'] = $subscriptions;
        }
        return response()->json($subscriptions,$response['code']);
    }



    /**
     * @OA\Put(
     *     tags={"Provider Companies"},
     *     path="/provider/companies/{id}/admit",
     *     summary="Admit Company ",
     *     @OA\Response(
     *         response=200,
     *         description="OK",
     *         @OA\JsonContent(
     *             @OA\Examples(example="result", value={"job":{},"success": true}, summary="An result object."),
     *         )
     *     )
     * 
     * )
    */
    function admit(Request $request,$id){
        $state = Config::get('constants.COMPANY_STATUS.active');
        $company = $this->CompanyRepositoryInterface->findCompany($id);
        if($company){
            $company->status = $state;
            $company->approved_at = Carbon::now();
            $company->approved_by = Auth::user()->id;
            $company->save();
            $response['response'] = 'updated_successfully';
            $response['success'] = true;
            $response['code'] = 200;

            $company->user->notify(new CommonNotification([
                "heading"=>"تم قبول العضوية",
                "type"=>"ProviderAdmitCompany",
                "notification_type"=>"ProviderAdmitEmployee",
                'to'=>'company',
                "id"=>$id,
                "data"=>['company'=>$company],
                "message"=>"تم قبول عضويتك بمنصة اكتساب",
            ])); 
        }else{
            $response['response'] = 'not_found';
            $response['success'] = true;
            $response['code'] = 403;
        }
        return response()->json($response,$response['code']);
    }

    

    /**
     * @OA\Put(
     *     tags={"Provider Companies"},
     *     path="/provider/companies/{id}/ban",
     *     summary="Ban company ",
     *     @OA\Response(
     *         response=200,
     *         description="OK",
     *         @OA\JsonContent(
     *             @OA\Examples(example="result", value={"job":{},"success": true}, summary="An result object."),
     *         )
     *     )
     * 
     * )
     */
    function ban(Request $request,$id){
        $state = Config::get('constants.COMPANY_STATUS.banned');
        $company = $this->CompanyRepositoryInterface->findCompany($id);
        if($company){
            $company->status = $state;
            $company->save();
            $response['response'] = 'banned_successfully';
            $response['success'] = true;
            $response['code'] = 200;

            $employee->user->notify(new CommonNotification([
                "heading"=>"تم حظر عضويتك ",
                "type"=>"ProviderBanEmployee",
                "notification_type"=>"ProviderAdmitEmployee",
                'to'=>'emp',
                "id"=>$id,
                "data"=>$employee,
                "messagee"=>"تم حظر عضويتك بمنصة اكتساب",
            ]));
        }else{
            $response['response'] = 'not_found';
            $response['success'] = true;
            $response['code'] = 403;
        }
        return response()->json($response,$response['code']);
    }

  

    
    /**
     * @OA\Delete(
     *     tags={"Provider Companies"},
     *     path="/provider/companies/{id}",
     *     summary="Delete company ",
     *     @OA\Response(
     *         response=200,
     *         description="OK",
     *         @OA\JsonContent(
     *             @OA\Examples(example="result", value={"response":"deleted_successfully","success": true}, summary="An result object."),
     *         )
     *     )
     * 
     * )
     */
    function delete_company($id){
        $company = $this->CompanyRepositoryInterface->destroyCompany($id);
        if($company){
            $response['response'] = 'created_successfully';
            $response['success'] = true;
            $response['code'] = 200;
        }else{
            $response['response'] = 'not_found';
            $response['success'] = true;
            $response['code'] = 403;
        }
        return response()->json($response,$response['code']);
    }






    function registerCompany(Request $request){
        $validator = Validator::make($request->all(), [
            'name_ar' => ['required', 'string', 'max:255'],
            'name_en' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users', 'unique:companies'],
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


        $response = array('response' => '', 'success' => false, 'code'=>'403');
        if ($validator->fails()) {
            $response['errors'] = $validator->messages();
        } else {
            $name_en = $request->name_en;
            $name_ar = $request->name_ar;
            $email = $request->email;
            $password = $request->password;
            $password_confirmation = $request->password_confirmation;
            $mobile = $request->mobile;
            $commercial_record = $request->commercial_record;
            $qualification = $request->qualification;
            $gender = $request->gender;
            $martial_status = $request->martial_status;
            $national_address_building_no = $request->national_address_building_no;
            $national_address_postal = $request->national_address_postal;
            $national_address_extra = $request->national_address_extra;
            $bank_name = $request->bank_name;
            $bank_ipan = $request->bank_ipan;  
            $user_type = $request->user_type;  
            
            $labor_office_company_id = $request->labor_office_company_id;  
            $insurance_office_company_id = $request->insurance_office_company_id;  
            

            $files = $request->files;
            foreach($files as $key=>$file){
                $file_name = time().'_'.$file->getClientOriginalName();
                $file_name = str_replace(" ","-",$file_name); 
                $file_name = uniqid().'_'.$file_name;
                $$key = "app/public/files/".$file_name;
                $file->move('storage/app/public/files/',$file_name);
            }


            $state = Config::get('constants.COMPANY_STATUS.pending');

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
                    'status'=>$state,
                ]);

                $user = $this->UserRepositoryInterface->createUser([
                            'name'=>$name_ar,
                            'user_name'=>$user_name,
                            'national_id'=>$commercial_record,
                            'email'=>$email,
                            'mobile'=>$mobile,
                            'user_type'=>$user_type,
                            'password' => Hash::make($password),
                ]);


                $company->user_id = $user->id;
                $company->save();
             

                $response['response'] = 'created_successfully';
                $response['company'] = $company;
                $response['success'] = true;
                $response['code'] = '200';
            }
        }
        
        return response()->json($response,$response['code']);
    }

}