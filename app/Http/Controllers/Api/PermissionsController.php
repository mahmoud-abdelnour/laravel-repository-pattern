<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Models\Product;
use Auth;
use Carbon\Carbon;
use App\Repositories\Interfaces\PermissionRepositoryInterface;

use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use App\Models\User;


class PermissionsController extends Controller{
    
     private $PermissionRepositoryInterface;
     public function __construct(PermissionRepositoryInterface $PermissionRepositoryInterface){
         $this->PermissionRepositoryInterface = $PermissionRepositoryInterface;
     }

	/**
     * @OA\Get(
     *     tags={"Permissions"},
     *     path="/permissions",
     *     summary="Get all permissions ",
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
          $permissions = $this->PermissionRepositoryInterface->allPermissions($request);
          return response()->json($permissions);
    }


	/**
     * @OA\Post(
     *     tags={"Permissions"},
     *     path="/permissions",
     *     summary="Create new permission ",
     *     @OA\RequestBody(
     *         @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 @OA\Property(
     *                     property="name",
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
		//if (Auth::user()->can('designation_create')) {
               
			$validator = Validator::make($request->all(), [
				'name' => 'required|max:191|string|unique:permissions,name'
			],
			[
				
			]);

			$response = array('response' => '', 'success' => false, 'code'=>'403');
			if ($validator->fails()) {
				$response['errors'] = $validator->messages();
				$response['code'] = '403';
			} else {
                    $permission = $this->PermissionRepositoryInterface->store([
                         'name' => $request->name,
                         'parent_id' => $request->parent_id,
                         'title_en' => $request->title_en,
                         'title_ar' => $request->title_ar,
                         'category' => $request->category,
                         'guard_name' => 'api'
                    ]);

				if ($permission) {
					$response['response'] = 'created_successfully';
					$response['success'] = true;
					$response['code'] = 200;
				}
			}

			return response()->json($response,$response['code']);
		//}
		//abort(403);
	}

	/**
     * @OA\Get(
     *     tags={"Permissions"},
     *     path="/permissions/{id}",
     *     summary="Get permission ",
     * 
     *     @OA\Response(
     *         response=200,
     *         description="OK",
     *         @OA\JsonContent(
     *             @OA\Examples(example="result", value={"permission":{},"success": true}, summary="An result object."),
     *         )
     *     )
     * 
     * )
     */
	function show($id){
		$response = array( 'success' => false, 'code'=>'405');
		if($id){
               $permission = $this->PermissionRepositoryInterface->findPermission($id);
			$response['permission'] = $permission;
			$response['success'] = true;
			$response['code'] = 200;
		}
		return response()->json($response,$response['code']);
	}


	/**
     * @OA\Put(
     *     tags={"Permissions"},
     *     path="/permissions/{id}",
     *     summary="Update permission ",
     * 
     *     @OA\Response(
     *         response=200,
     *         description="OK",
     *         @OA\JsonContent(
     *             @OA\Examples(example="result", value={"permission":{},"success": true}, summary="An result object."),
     *         )
     *     )
     * 
     * )
     */
	public function update(Request $request, $id) {
			$validator = Validator::make($request->all(), [
				'name' =>[Rule::unique('permissions')->where(function ($query) use ($request,$id) {
										return $query->where('id','!=',$id);
								}),
						'required'
						]
			],
			[


			]);

			$response = array('success' => false, 'code'=>'405');
			if ($validator->fails()) {
				$response['errors'] = $validator->messages();
			} else {
                    $permission = $this->PermissionRepositoryInterface->updatePermission($id,[
                         'name' => $request->name
                    ]);
				if ($permission) {
					$response['permission'] = $permission;
					$response['success'] = true;
					$response['code'] = 200;
				}
			}

			return response()->json($response,$response['code']);

	}


	/**
     * @OA\Delete(
     *     tags={"Permissions"},
     *     path="/permissions/{id}",
     *     summary="Delete permission ",
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
			$response = array('success' => false, 'code'=>'405');
               $job = $this->PermissionRepositoryInterface->findPermission($id);
			if ($permission) {
                    $this->PermissionRepositoryInterface->destroyPermission($id);
				$response['response'] = 'deleted_successfully';
				$response['success'] = true;
				$response['code'] = 200;
			}
			return response()->json($response,$response['code']);
		//}
	}


     /**
     * @OA\Get(
     *     tags={"Permissions"},
     *     path="/PermissionByKey",
     *     summary="Get permission by key",
     *     @OA\Parameter(
     *          name="type",
     *          in="query",
     *          required=true,
     *          description="The type",
     *          @OA\Schema(
     *              type="string"
     *          ),
     *     ),
     *     @OA\Parameter(
     *          name="id",
     *          in="query",
     *          required=true,
     *          description="The  ID ",
     *          @OA\Schema(
     *              type="string"
     *          ),
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="OK",
     *         @OA\JsonContent(
     *             @OA\Examples(example="result", value={"permission":{},"success": true}, summary="An result object."),
     *         )
     *     )
     * 
     * )
     */
     public static function PermissionByKey(Request $request,$json = true){
          $type = $request->type ;
          $id = $request->id ;
          $realPermissions = $request->realPermissions ;
          $response = array('response' => '', 'success' => false, 'code'=>'403');
          if($type == 'user' && !empty($id)){
               $user = User::find($id);
               $user_permissions = $user->getAllPermissions()->pluck('id')->toarray();
               $all_permissions = Permission::all();
               
               foreach($all_permissions as $perm){
                    $perm->isGranted = false;
                    if(in_array($perm->id,$user_permissions)){
                         $perm->isGranted = true;
                    }

                    $roles = $perm->roles->pluck('name');
                    unset($perm->roles);
                    $perm->roles = $roles;

                    if($perm->parent_id == 0){
                         $parents[] = $perm->id;
                         $all_permissions2[] = $perm; 
                    }else{
                         $the_perms[$perm->parent_id][] = $perm->toarray();
                         if(!in_array($perm->parent_id,$all_permissions->pluck('id')->toarray())){
                              $all_permissions2[] = $perm; 
                         }
                    }
               }


               foreach($all_permissions2 as $kk=>$perm){
                    $perm->permissions = $the_perms[$perm->id];
                    if(!$perm->isGranted && $perm->parent_id == 0){
                         //unset($all_permissions2[$kk]);
                    }else{
                         $all_permissions3[] = $perm;
                    }
               }

               if($realPermissions){
                    $all_permissions2 = $all_permissions3;
               }
               

               $response['code'] = 200;


               if($json)
			     return response()->json($all_permissions2,$response['code']);
               else
                    return $all_permissions2;

          }

          if($type == 'role' && !empty($id)){
               $role = Role::find($id);
               $role_permissions = $role->permissions->pluck('id')->toarray();
               $all_permissions = Permission::all();

               foreach($all_permissions as $perm){
                    $perm->isGranted = false;
                    if(in_array($perm->id,$role_permissions)){
                         $perm->isGranted = true;
                    }

                    if($perm->parent_id == 0){
                         $parents[] = $perm->id;
                         $all_permissions2[] = $perm; 
                    }else{
                         $the_perms[$perm->parent_id][] = $perm->toarray();
                         if(!in_array($perm->parent_id,$all_permissions->pluck('id')->toarray())){
                              $all_permissions2[] = $perm; 
                         }
                    }

               }

               foreach($all_permissions2 as $perm){
                    $perm->permissions = $the_perms[$perm->id];
               }
               $response['code'] = 200;

               if($json)
			     return response()->json($all_permissions2,$response['code']);
               else 
                    return $all_permissions2;
          }

          if($json)
               return response()->json($response,$response['code']);
          else
               return $response;

    

     }

}
