<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Models\Product;
use Auth;
use Carbon\Carbon;
use App\Repositories\Interfaces\JobRepositoryInterface;
use App\Repositories\Interfaces\UserRepositoryInterface;

use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use App\Models\User;
use App\Models\Task;
use App\Models\Job;
use Config;



class AdminJobsController extends Controller{
    
    private $JobRepositoryInterface;
    private $UserRepositoryInterface;
    
    public function __construct(JobRepositoryInterface $JobRepositoryInterface,UserRepositoryInterface $UserRepositoryInterface){
        $this->JobRepositoryInterface = $JobRepositoryInterface;
        $this->UserRepositoryInterface = $UserRepositoryInterface;
    }

	/**
     * @OA\Get(
     *     tags={"ProviderJobs"},
     *     path="provider/jobs",
     *     summary="Get all jobs ",
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
	public function index(Request $request){
        $jobs = $this->JobRepositoryInterface->allJobs($request);
        return response()->json($jobs);
    }


	/**
     * @OA\Post(
     *     tags={"ProviderJobs"},
     *     path="/provider/jobs",
     *     summary="Create new job ",
     *     @OA\RequestBody(
     *         @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 @OA\Property(
     *                     property="job_title",
     *                     type="string"
     *                 ),
     *                  @OA\Property(
     *                     property="job_description",
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
     *             @OA\Examples(example="result", value={"response":"created_successfully","success": true}, summary="An result object."),
     *         )
     *     )
     * 
     * )
     */
	public function store(Request $request) {
			$validator = Validator::make($request->all(), [
				'job_title' => 'required',
				'job_description' => 'required',
			],
			[
				
			]);

            $state = Config::get('constants.JOB_STATUS.active');
			$response = array('response' => '', 'success' => false, 'code'=>'403');
			if ($validator->fails()) {
				$response['errors'] = $validator->messages();
				$response['code'] = '403';
			} else {
                $job = $this->JobRepositoryInterface->storeJob([
                    'job_title' => $request->job_title,
                    'job_description' => $request->job_description,
                    'status' => $request->state,
                    'added_by' => Auth::user()->myid,
                ]);
                
				if ($job) {
					$response['response'] = 'created_successfully';
					$response['success'] = true;
					$response['code'] = 200;
				}
			}

			return response()->json($response,$response['code']);
	}

	/**
     * @OA\Get(
     *     tags={"ProviderJobs"},
     *     path="/provider/jobs/{id}",
     *     summary="Get Job ",
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
            $job = $this->JobRepositoryInterface->findJob($id);
			$response['job'] = $job;
			$response['success'] = true;
			$response['code'] = 200;
		}
		return response()->json($response,$response['code']);
	}


	/**
     * @OA\Put(
     *     tags={"ProviderJobs"},
     *     path="/provider/jobs/{id}",
     *     summary="Update job ",
     *     @OA\RequestBody(
     *         @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 @OA\Property(
     *                     property="job_title",
     *                     type="string"
     *                 ),
     *                  @OA\Property(
     *                     property="job_description",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="status",
     *                     type="string"
     *                 )
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="OK",
     *         @OA\JsonContent(
     *             @OA\Examples(example="result", value={"task":{},"success": true}, summary="An result object."),
     *         )
     *     )
     * 
     * )
     */
	public function update(Request $request, $id) {
        
        $validator = Validator::make($request->all(), [
            'job_title' => 'required',
            'job_description' => 'required',
        ],
        [
            
        ]);

        $response = array('success' => false, 'code'=>'405');
        if ($validator->fails()) {
            $response['errors'] = $validator->messages();
        } else {
            $job = $this->JobRepositoryInterface->updateJob($id,[
                'job_title' => $request->job_title,
                'job_description' => $request->course_description,
                'status' => $request->status,
           ]);
            if ($job) {
                $response['job'] = $job;
                $response['success'] = true;
                $response['code'] = 200;
            }
        }
        return response()->json($response,$response['code']);

	}


	/**
     * @OA\Delete(
     *     tags={"ProviderJobs"},
     *     path="/provider/jobs/{id}",
     *     summary="Delete job ",
     *     @OA\Response(
     *         response=200,
     *         description="OK",
     *         @OA\JsonContent(
     *             @OA\Examples(example="result", value={"response":"deleted_successfully","success": true}, summary="An result object."),
     *         )
     *     )
     * )
     */
	public function destroy(Request $request, $id) {    
        $response = array('success' => false, 'code'=>'405');
        $job = $this->JobRepositoryInterface->findJob($id);
        if ($job) {
            $this->JobRepositoryInterface->destroyJob($id);
            $response['response'] = 'deleted_successfully';
            $response['success'] = true;
            $response['code'] = 200;
        }
        return response()->json($response,$response['code']);
	}

}
