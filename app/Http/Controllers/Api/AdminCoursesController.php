<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Models\Product;
use Auth;
use Carbon\Carbon;
use App\Repositories\Interfaces\CourseRepositoryInterface;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use App\Models\User;
use App\Models\Task;
use App\Models\Course;


class AdminCoursesController extends Controller
{
    
     
    private $CourseRepositoryInterface;
    public function __construct(CourseRepositoryInterface $CourseRepositoryInterface){
        $this->CourseRepositoryInterface = $CourseRepositoryInterface;
    }


	/**
     * @OA\Get(
     *     tags={"ProviderCourses"},
     *     path="provider/courses",
     *     summary="Get all courses ",
     * 
     *     @OA\Response(
     *         response=200,
     *         description="OK",
     *         @OA\JsonContent(
     *             @OA\Examples(example="result", value={"permissions":{},"success": true}, summary="An result object."),
     *         )
     *     )
     * 
     * )
     */
	public function index(Request $request){
          $course = $this->CourseRepositoryInterface->allCourses($request);
          return response()->json($courses);
    }


	/**
     * @OA\Post(
     *     tags={"ProviderCourses"},
     *     path="/provider/courses",
     *     summary="Create new course ",
     *     @OA\RequestBody(
     *         @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 @OA\Property(
     *                     property="course_title",
     *                     type="string"
     *                 ),
     *              @OA\Property(
     *                     property="course_description",
     *                     type="string"
     *                 ),
     *               @OA\Property(
     *                     property="period",
     *                     type="string"
     *                 ),
     *              @OA\Property(
     *                     property="price",
     *                     type="string"
     *                 ),
     *              @OA\Property(
     *                     property="course_contract",
     *                     type="string"
     *                 ),
     *             )
     *         )
     *     ),
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
				'course_title' => 'required',
				'course_description' => 'required',
				'period' => 'required',
				'price' => 'required',
				'course_contract' => 'required'
			],
			[
				
			]);

			$response = array('response' => '', 'success' => false, 'code'=>'403');
			if ($validator->fails()) {
				$response['errors'] = $validator->messages();
				$response['code'] = '403';
			} else {
                    $course = $this->CourseRepositoryInterface->storeCourse([
                         'course_title' => $request->course_title,
                         'period' => $request->period,
                         'price' => $request->price,
                         'course_contract' => $request->course_contract,
                         'added_by' => $request->user()->id
                    ]);
				
				if ($course) {
					$response['response'] = 'created_successfully';
					$response['success'] = true;
					$response['code'] = 200;
				}
			}

			return response()->json($response,$response['code']);
	}

	/**
     * @OA\Get(
     *     tags={"ProviderCourses"},
     *     path="/provider/courses/{id}",
     *     summary="Get Course ",
     * 
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
	function show($id){
		$response = array( 'success' => false, 'code'=>'405');
		if($id){
               $course = $this->CourseRepositoryInterface->findCourse($id);
			$response['task'] = $task;
			$response['success'] = true;
			$response['code'] = 200;
		}
		return response()->json($response,$response['code']);
	}


	/**
     * @OA\Put(
     *     tags={"ProviderCourses"},
     *     path="/provider/courses/{id}",
     *     summary="Update course ",
     *     @OA\RequestBody(
     *         @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 @OA\Property(
     *                     property="course_title",
     *                     type="string"
     *                 ),
     *              @OA\Property(
     *                     property="course_description",
     *                     type="string"
     *                 ),
     *               @OA\Property(
     *                     property="period",
     *                     type="string"
     *                 ),
     *              @OA\Property(
     *                     property="price",
     *                     type="string"
     *                 ),
     *              @OA\Property(
     *                     property="course_contract",
     *                     type="string"
     *                 ),
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
               'course_title' => 'required',
               'course_description' => 'required',
               'period' => 'required',
               'price' => 'required',
               'course_contract' => 'required'
          ],
          [
               
          ]);

        $response = array('success' => false, 'code'=>'405');
        if ($validator->fails()) {
            $response['errors'] = $validator->messages();
        } else {
          $course = $this->CourseRepositoryInterface->updateCourse($id,[
               'course_title' => $request->course_title,
               'course_description' => $request->course_description,
               'period' => $request->period,
               'price' => $request->price,
               'course_contract' => $request->course_contract
          ]);
        
          if ($course) {
               $response['course'] = $course;
               $response['success'] = true;
               $response['code'] = 200;
          }
        }
        return response()->json($response,$response['code']);

	}


	/**
     * @OA\Delete(
     *     tags={"ProviderCourses"},
     *     path="/provider/course/{id}",
     *     summary="Delete course ",
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
	public function destroy(Request $request, $id) {
        $response = array('success' => false, 'code'=>'405');
        $course = $this->CourseRepositoryInterface->findCourse($id);
        if ($course) {
          $this->CourseRepositoryInterface->destroyCourse($id);
          $response['response'] = 'deleted_successfully';
          $response['success'] = true;
          $response['code'] = 200;
        }
        return response()->json($response,$response['code']);
	}

}
