<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Models\Product;
use Auth;
use Carbon\Carbon;
use App\Repositories\Interfaces\RoleRepositoryInterface;
use Spatie\Permission\Models\Role;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class RolesController extends Controller
{
    
    private $RoleRepositoryInterface;
    public function __construct(RoleRepositoryInterface $RoleRepositoryInterface){
        $this->RoleRepositoryInterface = $RoleRepositoryInterface;
    }
    /**
     * @OA\Get(
     *     tags={"Roles"},
     *     path="/roles",
     *     summary="Get all roles ",
     * 
     *     @OA\Response(
     *         response=200,
     *         description="OK",
     *         @OA\JsonContent(
     *             @OA\Examples(example="result", value={"roles":{},"success": true}, summary="An result object."),
     *         )
     *     )
     * 
     * )
	*/
	public function index(Request $request){
        $roles = $this->RoleRepositoryInterface->allRoles($request);
        return response()->json($roles);
    }



	/**
     * @OA\Post(
     *     tags={"Roles"},
     *     path="/roles",
     *     summary="Create new role ",
     *     @OA\RequestBody(
     *         @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 @OA\Property(
     *                     property="name",
     *                     type="string"
     *                 ),
	 *    			   @OA\Property(
     *                     property="permissions",
     *                     type="array",
     *                      @OA\Items(
     *                      ),
     *                 ),
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
		//if (Auth::user()->can('designation_create')) {

			$response['response'] = 'error';
			$response['success'] = false;
			$response['code'] = 403;
			$validator = Validator::make($request->all(), [
				'name' => 'required|max:191|string|unique:roles,name',
				//'permissions' => 'required|array',
			],
			[
				
			]);

			if ($validator->fails()) {
				$response['errors'] = $validator->messages();
				$response['code'] = '403';
			} else {
                $role = $this->RoleRepositoryInterface->storeRole([
                    'name' => $request->name,
                    'guard_name' => 'api'
                ]);

				if ($role) {
					if (!empty($request->permissions)) {
                        $role->givePermissionTo([$request->permissions]);
                    }

                    $response['response'] = 'created_successfully';
                    $response['success'] = true;
                    $response['role'] = $role;
                    $response['code'] = 200;
				}
			}

			return response()->json($response);
		//}
		abort(403);
	}

	
/**
     * @OA\Get(
     *     tags={"Roles"},
     *     path="/roles/{id}",
     *     summary="Get role ",
     * 
     *     @OA\Response(
     *         response=200,
     *         description="OK",
     *         @OA\JsonContent(
     *             @OA\Examples(example="result", value={"role":{},"success": true}, summary="An result object."),
     *         )
     *     )
     * 
     * )
     */
	function show($id){
		$response = array( 'success' => false, 'code'=>'405');
		if($id){
            $role = $this->RoleRepositoryInterface->findRole($id);
			$response['role'] = $role;
			$response['success'] = true;
			$response['code'] = 200;
		}
		return response()->json($response);
	}

	/**
     * @OA\Put(
     *     tags={"Roles"},
     *     path="/role/{id}",
     *     summary="Update role ",
     * 
     *     @OA\Response(
     *         response=200,
     *         description="OK",
     *         @OA\JsonContent(
     *             @OA\Examples(example="result", value={"role":{},"response":"updated_successfully","success": true}, summary="An result object."),
     *         )
     *     )
     * 
     * )
     */
	public function update(Request $request, $id) {
		//if (Auth::user()->can('designation_edit')) {

			$response['response'] = 'error';
			$response['success'] = false;
			$response['code'] = 403;
			$validator = Validator::make($request->all(), [
				'name' => 'required|max:191|string|unique:roles,name,'.$id,
				//'permissions' => 'required|array',
			],
			[
				
			]);

			if ($validator->fails()) {
				$response['errors'] = $validator->messages();
				$response['code'] = '403';
			} else {
				$role = Role::find($id);
				$role->name = $request->name;
                $role = $this->RoleRepositoryInterface->updateRole($id,[
                    'name' => $request->name
                ]);
				if ($role) {
					if(!empty($request->permissions)){
                        $role->syncPermissions([$request->permissions]);
                    }
                    $response['role'] = $role;
                    $response['success'] = true;
                    $response['response'] = 'updated_successfully';
                    $response['code'] = 200;
					
				}
			}
			return response()->json($response,$response['code']);

		//}
	}

	/**
     * @OA\Delete(
     *     tags={"Roles"},
     *     path="/roles/{id}",
     *     summary="Delete role ",
     * 
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
		//if (Auth::user()->can('designation_delete')) {
			$response['response'] = 'error';
			$response['success'] = false;
			$response['code'] = 403;
            $role = $this->RoleRepositoryInterface->findRole($id);
			if ($role) {
                $this->RoleRepositoryInterface->destroyRole($id);
				$response['success'] = true;
				$response['response'] = 'deleted_successfully';
				$response['code'] = 200;
			}
			return response()->json($response,$response['code']);

		//}
	}


}
