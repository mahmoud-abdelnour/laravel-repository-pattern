<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Auth\ResetsPasswords;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Password;
use Validator;
use App\Models\User;

class ResetPasswordController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Password Reset Controller
    |--------------------------------------------------------------------------
    |
    | This controller is responsible for handling password reset requests
    | and uses a simple trait to include this behavior. You're free to
    | explore this trait and override any methods you wish to tweak.
    |
    */

    use ResetsPasswords;

    /**
     * Where to redirect users after resetting their password.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::HOME;

    function reseter(Request $request){

        $login = request()->input('national_id');
        $fieldType = filter_var($login, FILTER_VALIDATE_EMAIL) ? 'email' : 'national_id';
        request()->merge([$fieldType => $login]);
        
        //$request->validate($this->rules($fieldType), $this->validationErrorMessages()); 

        $validator = Validator::make($request->all(), $this->rules($fieldType),[
            'national_id.required' => 'فضلا أدخل الهوية الوطنية'
        ]);

        if(  $validator->fails() ){
            $res['errors'] = $validator->messages();
        }else{
            if($fieldType == 'national_id'){
                $request->request->remove('email');
                $national_id = $request->national_id;
                $user = User::where('national_id',$national_id)->first();
                $request->merge([
                    'national_id' => $national_id,
                    'email' => $user->email,
                ]);
                
            }
            
           
            // Here we will attempt to reset the user's password. If it is successful we
            // will update the password on an actual user model and persist it to the
            // database. Otherwise we will parse the error and return the response.
           /*  $response = $this->broker()->reset(
                $this->credentials($request), function ($user, $password) {
                $this->resetPassword($user, $password);
                }
            );


            // If the password was successfully reset, we will redirect the user back to
            // the application's home authenticated view. If there is an error we can
            // redirect them back to where they came from with their error message.
             $response == Password::PASSWORD_RESET
                        ? $this->sendResetResponse($request, $response)
                        : $this->sendResetFailedResponse($request, $response);


            $res['response'] =  trans($response); */
            $res['response'] =  trans('sas'); 

            $res['user'] =  $user;

        }

        return response()->json($res);

    }



    protected function rules($fieldType){
        if($fieldType == 'national_id')
            return [
                'token' => 'required',
                'national_id' => 'required',
                'password' => 'required|confirmed|min:6',
            ];
        else
            return [
                'token' => 'required',
                'email' => 'required|email',
                'password' => 'required|confirmed|min:6',
            ];

    }
}
