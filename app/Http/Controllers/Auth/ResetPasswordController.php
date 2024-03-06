<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Auth\ResetsPasswords;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Password;

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

 //   use ResetsPasswords;

    /**
     * Where to redirect users after resetting their password.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::HOME;

    public function showResetForm(Request $request, $token = null){
        return view('auth.passwords.reset')->with(
            ['token' => $token, 'email' => !empty($request->email)?$request->email:$request->national_id ,'national_id' => $request->national_id]
        );
    }
    
    public function reset(Request $request){
        dd($request);
        
        $login = request()->input('email');
        $fieldType = filter_var($login, FILTER_VALIDATE_EMAIL) ? 'email' : 'national_id';
        request()->merge([$fieldType => $login]);

        
        $request->validate($this->rules($fieldType), $this->validationErrorMessages()); 
        
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
        $response = $this->broker()->reset(
            $this->credentials($request), function ($user, $password) {
               $this->resetPassword($user, $password);
            }
        );

      

        // If the password was successfully reset, we will redirect the user back to
        // the application's home authenticated view. If there is an error we can
        // redirect them back to where they came from with their error message.
        return $response == Password::PASSWORD_RESET
                    ? $this->sendResetResponse($request, $response)
                    : $this->sendResetFailedResponse($request, $response);
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
