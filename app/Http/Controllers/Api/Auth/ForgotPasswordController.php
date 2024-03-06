<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\SendsPasswordResetEmails;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Password;
use Validator;
class ForgotPasswordController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Password Reset Controller
    |--------------------------------------------------------------------------
    |
    | This controller is responsible for handling password reset emails and
    | includes a trait which assists in sending these notifications from
    | your application to your users. Feel free to explore this trait.
    |
    */

    use SendsPasswordResetEmails;

    
    function sendResetLinkEmail(Request $request){
        $validator = Validator::make($request->all(), [
            'national_id' => 'required'
        ],[
            'national_id.required' => 'فضلا أدخل الهوية الوطنية'
        ]);
        if(  $validator->fails() ){
            $res['errors'] = $validator->messages();
        }else{

            $login = request()->input('national_id');
            $fieldType = filter_var($login, FILTER_VALIDATE_EMAIL) ? 'email' : 'national_id';
            request()->merge([$fieldType => $login]);
        
            if($fieldType == 'national_id'){
                $national_id = $request->national_id;
                $user = $this->broker()->getUser(['national_id'=>$national_id]);
                if($user){
                    $request->merge([
                        'national_id' => $national_id,
                    ]);
                }    
            }

            $response = $this->broker()->sendResetLink(
                $request->only($fieldType)
            );
            

            if ($response === Password::RESET_LINK_SENT) {
                $res['status'] =  trans($response);
            }else{
                $res['errors'] = ['email' => trans($response)];
            }


            return response()->json($res);
        }

    }
}
