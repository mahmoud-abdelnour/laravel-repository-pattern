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
use Illuminate\Validation\Rules\Password;
use App\Notifications\NewRegistrationNotification;
use Config;
use App\Http\Controllers\Api\PermissionsController;
use App\Models\Attendance;
use App\Models\LogCount;
use App\Models\Setting;

class AuthController extends Controller{

    
    /**
     * @OA\Post(
     *     tags={"Register"},
     *     path="/registerEmployee",
     *     summary="Register as Employee ",
     *     @OA\RequestBody(
     *         @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 @OA\Property(
     *                     property="name_ar",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="name_en",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="user_name",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="password",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="password_confirmation",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="email",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="mobile",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="national_id",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="qualification",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="gender",
     *                     type="string",
     *                     description="[male, female]"
     *                 ),
     *                  @OA\Property(
     *                     property="martial_status",
     *                     type="string",
     *                     description="[married,single,devorced,widow]"
     *                 ),
     *                 @OA\Property(
     *                     property="bank_name",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="bank_ipan",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="job_id",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="qualification_file",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="national_address_file",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="bank_ipan_file",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="national_id_file",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="secret_approvement_file",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="registered_in_remote_work_platform",
     *                     type="boolean"
     *                 ),
     *                 @OA\Property(
     *                     property="user_type",
     *                     type="string",
     *                     description="[employee,company]"
     *                 )
     *                
     *             )
     *         )
     *     ),
     * 
     *     @OA\Response(
     *         response=200,
     *         description="OK",
     *         @OA\JsonContent(
     *             @OA\Examples(example="result", value={"response":"created_successfully","employee":{},"success": true}, summary="An result object."),
     *         )
     *     )
     * 
     * )
     */
    function registerEmployee(Request $request){

       

        $validator = Validator::make($request->all(), [
            //'user_name' => ['required', 'string', 'max:255'],
            'name_ar' => ['required', 'string', 'max:255'],
            'name_en' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            //'password' => ['required', 'string', 'min:8', 'confirmed'],
            'password' => ['required', 'string', 'confirmed'],
            'mobile' => ['required', 'string','unique:users'],
            'national_id' => ['required', 'string','unique:users','unique:employees'],
            'qualification' => ['required', 'string'],
            'gender' => ['required'],
            'martial_status' => ['required'],
            'bank_name' => ['required', 'string'],
            'bank_ipan' => ['required', 'string'],
            //'job_id' => ['required', 'string'],
            'qualification_file' => ['required', 'file'],
            'national_address_file' => ['required', 'file'],
            'bank_ipan_file' => ['required', 'file'],
            'national_id_file' => ['required', 'file'],
            'secret_approvement_file' => ['required', 'file'],
            //'electronic_signature_file' => ['required', 'file'],
            //'electronic_signature_approval' => ['required'],
            
            'user_type' => ['required'],
            
            /* 'national_address_building_no' => ['required'],
            'national_address_postal' => ['required'],
            'national_address_extra' => ['required'], */
        ],
        [
          //  'password.min' => 'كلم'
        ]);

        $response = array('response' => '', 'success' => false, 'code'=>'403');
        if ($validator->fails()) {
            $response['errors'] = $validator->messages();
        } else {
            $user_type = $request->user_type;

            $user_name = $request->user_name;
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
            $job_id = $request->job_id;
            $qualification_file = $request->qualification_file;
            $national_address_file = $request->national_address_file;
            $bank_ipan_file = $request->bank_ipan_file;
            $national_id_file = $request->national_id_file;
            $electronic_signature_approval = $request->electronic_signature_approval?1:0;
            $secret_approvement_file = $request->secret_approvement_file;
            $registered_in_remote_work_platform = $request->registered_in_remote_work_platform;
            //$electronic_signature_file = $electronic_signature_file;
            

            $files = $request->files;
            foreach($files as $key=>$file){
                $file_name = time().'_'.$file->getClientOriginalName();
                $file_name = str_replace(" ","-",$file_name); 
                $file_name = uniqid().'_'.$file_name;
                $$key = "app/public/files/".$file_name;
                $file->move('storage/app/public/files/',$file_name);
            }



            if($user_type == 'employee'){
                $employee =  Employee::create([
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
                    'bank_ipan'=>$bank_ipan,
                    'job_id'=>$job_id,
                    'national_id_file'=>$national_id_file,
                    'qualification_file'=>$qualification_file,
                    'national_address_file'=>$national_address_file,
                    'bank_ipan_file'=>$bank_ipan_file,
                    'registered_in_remote_work_platform'=>$registered_in_remote_work_platform??0,
                    'electronic_signature_approval'=>$electronic_signature_approval,
                    'secret_approvement_file'=>$secret_approvement_file,
                    'electronic_signature_file'=>$electronic_signature_file,
                    'status'=>'pending',
                ]);



                $user = User::create([
                            'name'=>$name_ar,
                            'user_name'=>$user_name,
                            'email'=>$email,
                            'national_id'=>$national_id,
                            'mobile'=>$mobile,
                            'user_type'=>$user_type,
                            'password' => Hash::make($password),
                        ]);


                $employee->user_id = $user->id;
                $employee->save();
                $response['employee'] = $employee;
                $response['response'] = 'created_successfully';
                $response['success'] = true;
                $response['code'] = 200;


                $super_admins = \Helper::super_admins();
                foreach($super_admins as $admin){
                    try{
                        $admin->notify(new NewRegistrationNotification([
                            "heading"=>" تسجيل موظف ",
                            "type"=>"NewEmpRegistration",
                            "id"=>$employee->id,
                            "data"=>$employee,
                            "message"=>"تسجيل موظف  جديد"
                            ])); 
                    }catch(\Exception $e ){
                        
                    }
                }
            }
        }

        return response()->json($response,$response['code']);

    }




    /**
     * @OA\Post(
     *     tags={"Register"},
     *     path="/registerCompany",
     *     summary="Register as Company ",
     *     @OA\RequestBody(
     *         @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 @OA\Property(
     *                     property="name_ar",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="name_en",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="user_name",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="password",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="password_confirmation",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="email",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="mobile",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="commercial_record",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="national_address_building_no",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="national_address_postal",
     *                     type="string",
     *                 ),
     *                  @OA\Property(
     *                     property="national_address_extra",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="labor_office_company_id",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="insurance_office_company_id",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="commercial_record_file",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="tax_registration_certificate_file",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="national_address_file",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="user_type",
     *                     type="string",
     *                     description="[employee,company]"
     *                 )
     *             )
     *         )
     *     ),
     * 
     *     @OA\Response(
     *         response=200,
     *         description="OK",
     *         @OA\JsonContent(
     *             @OA\Examples(example="result", value={"response":"created_successfully","success": true}, summary="An result object."),
     *             @OA\Examples(example="bool", value=false, summary="A boolean value."),
     *         )
     *     )
     * 
     * )
     */
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
          //  'password.min' => 'كلم'
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
                $company =  Company::create([
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

                $user = User::create([
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
                
                $super_admins = \Helper::super_admins();
                foreach($super_admins as $admin){
                    try{
                        $admin->notify(new NewRegistrationNotification([
                            "heading"=>" تسجيل موظف ",
                            "type"=>"NewCompanyRegistration",
                            "id"=>$employee->id,
                            "data"=>$employee,
                            "message"=>"تسجيل شركة جديدة"
                        ])); 
                    }catch(\Exception $e){

                    }
                }

                $response['response'] = 'created_successfully';
                $response['company'] = $company;
                $response['success'] = true;
                $response['code'] = '200';
            }
        }
        
        return response()->json($response,$response['code']);
    }


     /**
     * @OA\Post(
     *     tags={"Login"},
     *     path="/login",
     *     summary="Login",
     *     @OA\RequestBody(
     *         @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 @OA\Property(
     *                     property="national_id",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="password",
     *                     type="string"
     *                 )
     *             )
     *         )
     *     ),
     * 
     *     @OA\Response(
     *         response=200,
     *         description="OK",
     *         @OA\JsonContent(
     *             @OA\Examples(example="result", value={"result":"success","data":{} }, summary="An result object."),
     *             @OA\Examples(example="bool", value=false, summary="A boolean value."),
     *         )
     *     )
     * 
     * )
     */
    function login(Request $request){
        $email = $request->email;
        $national_id = $request->national_id;
        $commercial_record = $request->commercial_record;
        $password = $request->password;
        $user_type = $request->user_type;

        $validator = Validator::make($request->all(), [
            //'national_id' => ['required'],
            'password' => ['required'],
        ],
        [
          
        ]);



        $response = array('response' => '', 'success' => false, 'code'=>'403');
        if ($validator->fails()) {
            $response['errors'] = $validator->messages();
        } else {
            if(!empty($commercial_record)){
                $credentials = ['national_id'=>$commercial_record,'password'=>$password];
            }else{
                if(!empty($user_type)){
                    $credentials = ['national_id'=>$national_id,'password'=>$password,'user_type'=>$user_type];
                }else{
                    $credentials = ['national_id'=>$national_id,'password'=>$password];
                }
            }
            /* Lcobucci\JWT\Signer\InvalidKeyProvided: It was not possible to parse your key, reason:
            vendor\lcobucci\jwt\src\Signer\InvalidKeyProvided.php on line 17 */

            //return print_r($credentials);
           
            \DB::enableQueryLog();
            $check = Auth::attempt($credentials);
            //dd(\DB::getQueryLog());
            if($check){
               
                $user = Auth::user();
                if($user->entity())
                    $entity = $user->entity;
                $tokenResult = $user->createToken('Personal Access Token');
                $token = $tokenResult->token;
                $token->expires_at = Carbon::now()->addWeeks(4);
                $token->save();
                
                $settings = Setting::first();
                $day = date('D');
                $holydays = ["Fri","Sat"];
                //&& !in_array($day,$holydays)
                   
                if($user->user_type == 'employee' && $entity && $settings->task_assign_method != 'automatic'){
                    $today = date('Y-m-d');
                    $attendance = Attendance::whereRaw(" DATE_FORMAT(check_in, '%Y-%m-%d') = '".$today."' ")->where('emp_id',$entity->id)->first();
                    if(!$attendance){
                        $checkin_date = date('Y-m-d H:i');
                        Attendance::create([
                            'emp_id'=>$entity->id,
                            'check_in'=>$checkin_date,
                            'attendance_type'=>'manual'
                        ]); 
                    }

                    LogCount::create([
                        'action_type'=>'login',
                        'log_type'=>'manual',
                        'user_id'=> $request->user()->id,
                    ]);      
                }elseif($user->user_type == 'employee' && $settings->task_assign_method == 'automatic'){
                    LogCount::create([
                        'action_type'=>'login',
                        'log_type'=>'automatic',
                        'user_id'=> $request->user()->id,
                    ]);   
                }

               

                $request->merge(['id'=>$user->id,'type'=>'user']);
                $eeee = PermissionsController::PermissionByKey($request,false);
                return response()->json([
                    'response' => "success",
                    'data' => [
                        'user' => $user,
                        'permissions' => $eeee,
                        'access_token' => $tokenResult->accessToken,
                        'token_type' => 'Bearer',
                        'expires_at' => Carbon::parse(
                            $tokenResult->token->expires_at
                        )->toDateTimeString()
                    ]
                ], 200);
            }else{
                return response()->json([
                    'response' => "Credentials not match our records",
                ], 405);
            }
        }

        return response()->json($response,$response['code']);

    }


    function register(Request $request){
        $user_type = $request->user_type;
        if($user_type == 'employee'){
            
        }elseif($user_type == 'company'){

        }
    }



    /**
     * @OA\Get(
     *     tags={"Provider"},
     *     path="/provider/profile",
     *     summary="Get Provider Profile ",
     *     @OA\Response(
     *         response=200,
     *         description="OK",
     *         @OA\JsonContent(
     *             @OA\Examples(example="result", value={"success":true,"code":200,"user":{}}, summary="An result object."),
     *         )
     *     )
     * 
     * )
    */
    function providerProfile(Request $request){
        $user =  $request->user();
        if($user){

             $request->merge(['id'=>$user->id,'type'=>'user','realPermissions'=>true]);
             $user->permissions = PermissionsController::PermissionByKey($request,false);
             $user->roles;
             $entity = $user->entity;
             $response['user'] = $user; 
             $response['code'] = 200; 
             $response['success'] = true;
        }else{
             $response = array('response' => 'not_found', 'success' => false, 'code'=>'403');
        }
 
        return response()->json($response,$response['code']);
    }



    /**
     * @OA\Post(
     *     tags={"Misc"},
     *     path="provider/updateProfile",
     *     summary="",
     *     @OA\RequestBody(
     *         @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 @OA\Property(
     *                     property="name",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="email",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="password",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="mobile",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="national_id",
     *                     type="string"
     *                 )
     *             )
     *         )
     *     ),
     * 
     *     @OA\Response(
     *         response=200,
     *         description="OK",
     *         @OA\JsonContent(
     *             @OA\Examples(example="result", value={"response":"created_successfully","success":true,"code":200,"subscription":{"subscription_type":"membership","is_approved":0,"payment_file":"files\/63ee16d9e2e79_1676547801_ektsab_wireframe-(1).pdf","payment_amount":"500","year":"2023","month":"02","emp_id":10,"updated_at":"2023-02-16T11:43:21.000000Z","created_at":"2023-02-16T11:43:21.000000Z","id":6}}, summary="An result object."),
     *         )
     *     )
     * )
    */
    function updateProfile(Request $request){
        $user =  $request->user();
        if($user){
            $validator = Validator::make($request->all(), [
                'name' => ['required', 'string', 'max:255'],
                'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email,'.$user->id],
                //'password' => ['required', 'string', 'confirmed'],
                'password' => 'min:6|required_with:password_confirmation|same:password_confirmation',

                'mobile' => ['required', 'unique:users,mobile,'.$user->id],
                'national_id' => ['required', 'unique:users,national_id,'.$user->id],
            ],
            [
             
            ]);


          
            $response = array('response' => '', 'success' => false, 'code'=>'403');
            if ($validator->fails()) {
                $response['errors'] = $validator->messages();
            } else {
                $name_ar = $request->name;
                $email = $request->email;
                $password = $request->password;
                $password_confirmation = $request->password_confirmation;
                $mobile = $request->mobile;
                $national_id = $request->national_id;
                //$national_address_extra = $request->national_address_extra;


                $user->update([
                    'name'=>$name_ar??$user->name_ar,
                    'email'=>$email??$user->email,
                    'national_id'=>$national_id??$user->national_id,
                    'mobile'=>$mobile??$user->mobile,
                    'password' => !empty($password)?Hash::make($password):$user->password,
                ]);

                $response['response'] = 'updated_successfully';
                $response['success'] = true;
                $response['code'] = 200;
            }

            return response()->json($response,$response['code']);

        }
    }
}