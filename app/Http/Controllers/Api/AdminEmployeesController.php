<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Models\Course;
use Auth;
use Carbon\Carbon;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use App\Repositories\Interfaces\EmployeeRepositoryInterface;
use App\Repositories\Interfaces\UserRepositoryInterface;
use Illuminate\Validation\Rules\Password;
use App\Notifications\CommonNotification;
use App\Notifications\NewRegistrationNotification;
use Config;
use DB;



class AdminEmployeesController extends Controller{

    private $EmployeeRepositoryInterface;
    private $UserRepositoryInterface;

    public function __construct(EmployeeRepositoryInterface $EmployeeRepositoryInterface,UserRepositoryInterface $UserRepositoryInterface){
        $this->EmployeeRepositoryInterface = $EmployeeRepositoryInterface;
        $this->UserRepositoryInterface = $UserRepositoryInterface;
    }


    /**
     * @OA\Get(
     *     tags={"Provider Employees"},
     *     path="provider/employees",
     *     summary="Get all employees ",
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
    public static function index(Request $request){
        $response['success'] = true;
        $response['code'] = 200;
        $employees = $this->EmployeeRepositoryInterface->allCompanies($request);
		return response()->json($employees,$response['code'] );
    }

    /**
     * @OA\Get(
     *     tags={"Provider Employees"},
     *     path="/provider/employees/{id}",
     *     summary="Get employee ",
     * 
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
    function show($id){
		$response = array( 'success' => false, 'code'=>'405');
		if($id){
			$employee = $this->EmployeeRepositoryInterface->find($id);
            if($employee){
                $response['employee'] = $employee;
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
     * @OA\Put(
     *     tags={"Provider Employees"},
     *     path="/provider/employees/{id}/admit",
     *     summary="Admit employee ",
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
        $state = Config::get('constants.EMPLOYEE_STATUS.active');
        $employee = $this->EmployeeRepositoryInterface->find($id);
        if($employee){
            $employee->status = $state;
            $employee->approved_at = Carbon::now();
            $employee->approved_by = Auth::user()->id;
            $employee->save();
            $response['response'] = 'updated_successfully';
            $response['success'] = true;
            $response['code'] = 200;

            $employee->user->notify(new CommonNotification([
                "heading"=>"تم قبول العضوية",
                "type"=>"ProviderAdmitEmployee",
                "notification_type"=>"ProviderAdmitEmployee",
                'to'=>'emp',
                "id"=>$id,
                "data"=>$employee,
                "messagee"=>"تم قبول عضويتك بمنصة اكتساب",
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
     *     tags={"Provider Employees"},
     *     path="/provider/employees/{id}/ban",
     *     summary="Ban employee ",
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
        $state = Config::get('constants.EMPLOYEE_STATUS.banned');
        $employee = $this->EmployeeRepositoryInterface->find($id);
        if($employee){
            $employee->status = $state;
            $employee->save();
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
     * @OA\Put(
     *     tags={"Provider Employees"},
     *     path="/provider/employees/{id}/suggestCourses",
     *     summary="Suggest Courses for employee ",
     *     @OA\RequestBody(
     *         @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 @OA\Property(
     *                     property="course_id",
     *                     type="string"
     *                 ),
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="OK",
     *         @OA\JsonContent(
     *             @OA\Examples(example="result", value={"response":{},"success": true}, summary="An result object."),
     *         )
     *     )
     * 
     * )
     */
    function suggestCourses(Request $request,$id){
        $state = Config::get('constants.EMP_COURSE_STATUS.pending');
        $course_id = $request->course_id;
        if(!is_array($course_id)){
            $course_id = [$course_id];
        }
        $employee = $this->EmployeeRepositoryInterface->find($id);
        if($employee){
            foreach($course_id as $c){
                $employee->courses()->insert([
                    'course_id'=>$c,
                    'emp_id'=>$employee->id,
                ]);
            }


            $response['response'] = 'created_successfully';
            $response['success'] = true;
            $response['code'] = 200;

            $courses = Course::whereIn('id',$course_id)->get();

            $employee->user->notify(new CommonNotification([
                "heading"=>" ترشيح  دورات تدريبية ",
                "type"=>"ProviderSuggestedCourses",
                "notification_type"=>"ProviderSuggestedCourses",
                'to'=>'emp',
                "id"=>$id,
                "courses"=>$courses,
                "data"=>['employee'=>$employee,'courses'=>$courses],
                "messagee"=>"تم ترشيح بعض الدورات التدريبية لك ",
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
     *     tags={"Provider Employees"},
     *     path="/provider/employees/{id}",
     *     summary="Delete employee ",
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
    function delete_employee($id){
        $employee = $this->EmployeeRepositoryInterface->destroyEmployee($id);
        if($employee){
            $response['response'] = 'deleted_successfully';
            $response['success'] = true;
            $response['code'] = 200;
        }else{
            $response['response'] = 'not_found';
            $response['success'] = true;
            $response['code'] = 403;
        }
        return response()->json($response,$response['code']);
    }




    function registerEmployee(Request $request){
    
         $validator = Validator::make($request->all(), [
             'name_ar' => ['required', 'string', 'max:255'],
             'name_en' => ['required', 'string', 'max:255'],
             'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
             'password' => ['required', 'string', 'confirmed'],
             'mobile' => ['required', 'string','unique:users'],
             'national_id' => ['required', 'string','unique:users','unique:employees'],
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
             'user_type' => ['required'],
         ],
         [
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
                     'added_by'=> $request->user()->id,
                 ]);
 
                 
                 $user = $this->UserRepositoryInterface->createUser([
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
 
             }
         }
 
         return response()->json($response,$response['code']);
     }
   
}