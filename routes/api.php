<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/



Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:api');


//auth
Route::post('/registerEmployee', [App\Http\Controllers\Api\AuthController::class, 'registerEmployee'])->name('registerEmployee');
Route::post('/registerCompany', [App\Http\Controllers\Api\AuthController::class, 'registerCompany'])->name('registerCompany');
Route::post('/login', [App\Http\Controllers\Api\AuthController::class, 'login'])->name('login');

Route::get('permissions/PermissionByKey', [App\Http\Controllers\Api\PermissionsController::class, 'PermissionByKey'])->name('PermissionByKey');

Route::resource('permissions', 'App\Http\Controllers\Api\PermissionsController');
Route::resource('roles', 'App\Http\Controllers\Api\RolesController');

Route::get('/provider/JobRequestss', [App\Http\Controllers\Api\AdminJobRequestsController::class, 'index'])->name('admin.jobRequest.index');

Route::get('/provider/employees', [App\Http\Controllers\Api\AdminEmployeesController::class, 'index'])->name('admin.emp.index');


Route::post('password/email', [App\Http\Controllers\Api\Auth\ForgotPasswordController::class, 'sendResetLinkEmail'])->name('admin.sendResetLinkEmail');
Route::get('password/reset/{token}', [App\Http\Controllers\Auth\ResetPasswordController::class, 'showResetForm'])->name('password.showResetForm');
Route::post('password/reseter', [App\Http\Controllers\Api\Auth\ResetPasswordController::class, 'reseter'])->name('password.ressset');

Route::group(['middleware' => 'auth:api'], function () {
  

    //user_type admin
    Route::post('/provider/employees/ban', [App\Http\Controllers\Api\AdminEmployeesController::class, 'ban'])->name('admin.emp.ban');
    Route::get('/provider/employees', [App\Http\Controllers\Api\AdminEmployeesController::class, 'index'])->name('admin.emp.index');
    Route::get('/provider/employees/{id}', [App\Http\Controllers\Api\AdminEmployeesController::class, 'show'])->name('admin.emp.show');
    Route::get('/provider/employees/{id}/payments', [App\Http\Controllers\Api\AdminEmployeesController::class, 'payments'])->name('admin.emp.payments');
    Route::put('/provider/employees/{id}/admit', [App\Http\Controllers\Api\AdminEmployeesController::class, 'admit'])->name('admin.emp.admit');
    Route::put('/provider/employees/{id}/ban', [App\Http\Controllers\Api\AdminEmployeesController::class, 'ban'])->name('admin.emp.ban');
    Route::put('/provider/employees/{id}/suggestCourses', [App\Http\Controllers\Api\AdminEmployeesController::class, 'suggestCourses'])->name('admin.emp.suggestCourses');
    Route::delete('/provider/employees/{id}', [App\Http\Controllers\Api\AdminEmployeesController::class, 'delete_employee'])->name('admin.emp.delete_employee');
    Route::get('/provider/candidates', [App\Http\Controllers\Api\AdminEmployeesController::class, 'candidates'])->name('admin.candidates');
    
    Route::post('/provider/approve_resign/{id}', [App\Http\Controllers\Api\AdminEmployeesController::class, 'approve_resign'])->name('admin.approve_resign');
    Route::get('/provider/resigns', [App\Http\Controllers\Api\AdminEmployeesController::class, 'resigns'])->name('admin.resigns');

    

    //provider companies
    Route::get('/provider/companies', [App\Http\Controllers\Api\AdminCompaniesController::class, 'index'])->name('admin.company.index');
    Route::get('/provider/companies/{id}', [App\Http\Controllers\Api\AdminCompaniesController::class, 'show'])->name('admin.company.show');
    Route::get('/provider/companies/{id}/payments', [App\Http\Controllers\Api\AdminCompaniesController::class, 'payments'])->name('admin.company.payments');
    Route::put('/provider/companies/payments/{id}', [App\Http\Controllers\Api\AdminCompaniesController::class, 'approve_payment'])->name('admin.company.approve_payment');
    Route::put('/provider/companies/{id}/admit', [App\Http\Controllers\Api\AdminCompaniesController::class, 'admit'])->name('admin.company.admit');
    Route::put('/provider/companies/{id}/ban', [App\Http\Controllers\Api\AdminCompaniesController::class, 'ban'])->name('admin.company.ban');
    Route::delete('/provider/companies/{id}', [App\Http\Controllers\Api\AdminCompaniesController::class, 'delete_company'])->name('admin.company.delete_company');
    


    //provider courses
    Route::resource('provider/courses', 'App\Http\Controllers\Api\AdminCoursesController');

    //provider jobs
    Route::post('provider/jobs/assign_tasks', [App\Http\Controllers\Api\AdminJobsController::class, 'assign_tasks'])->name('PermissionByKey');
    Route::resource('provider/jobs', 'App\Http\Controllers\Api\AdminJobsController');
    
    Route::get('/provider/attendances', [App\Http\Controllers\Api\MiscController::class, 'attendances'])->name('admin.settings');
    Route::post('provider/registerEmployee', [App\Http\Controllers\Api\AdminEmployeesController::class, 'registerEmployee'])->name('provider.registerEmployee');
    Route::post('provider/registerCompany', [App\Http\Controllers\Api\AdminCompaniesController::class, 'registerCompany'])->name('provider.registerCompany');
    
    
    
    
});

