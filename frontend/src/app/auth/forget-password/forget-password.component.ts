import { Component, OnInit } from '@angular/core';


import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { UserType } from 'src/shared/enums/user-type';
import { ApiService } from 'src/shared/services/api.service';
import { Endpoints } from 'src/shared/services/endpoints';
import { UserService } from 'src/shared/services/user.service';
import { ThemeService } from 'src/shared/services/theme.service';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
  form:FormGroup;
  UserType = UserType;


 /*  constructor() { }

  ngOnInit(): void {


  } */

  


  loginOptions = {
    [UserType.employee] : {
      url:'/auth/login/company',
      registerUrl:'/auth/register/employee',
      title:'LoginAsCompany'
    },
    [UserType.company] : {
      url:'/auth/login/employee',
      registerUrl:'/auth/register/company',
      title:'LoginAsEmployee'
    }
  }

  constructor(
    private apiService:ApiService,
    private router:Router,
    private userService:UserService,
    public activatedRoute:ActivatedRoute,
    private themeService:ThemeService,
    private translateService:TranslateService,

    ) { }
    
  token;
  formType;
  ngOnInit(): void {
    this.token = this.activatedRoute.snapshot.params['token'];
    this.formType = this.activatedRoute.snapshot.data['formType'];

    console.log(this.activatedRoute.snapshot);
    
    // this.form = new FormGroup({
    //   national_id : new FormControl(null, Validators.required),
    //   commercial_record:new FormControl(null),
    //   password : new FormControl(null, Validators.required),
    // });

    this.createForm();
  }

  createForm() {

      if(this.formType == 'form'){
        this.form = new FormGroup({
          national_id : new FormControl(null, Validators.required),
        });
      }else{
          this.form = new FormGroup({
            password : new FormControl(null, Validators.required),
          });
          this.form.addControl('national_id', new FormControl(null, Validators.required));
          this.form.addControl('password', new FormControl(null, Validators.required));
          this.form.addControl('password_confirmation', new FormControl(null, Validators.required));
          this.form.addControl('token', new FormControl(this.token));
          this.form.updateValueAndValidity();
      }

  }


  isSending = false;
  forget() {
      //console.log(this.form);
      
      if(this.form.invalid) return;
      let value = {...this.form.value};

      this.isSending = true;
      this.apiService.post(Endpoints.forget_password, value)
      .pipe(
        finalize(() => this.isSending = false)
      )
      .subscribe( (response:any) => {
        let {errors} = response;

        if(response['errors']){
            let str = this.translateService.instant(response['errors'].email);
            this.themeService.openSnackBar(str,'','error');
        }else if(response['response']){
            let str = this.translateService.instant(response['response']);
            this.themeService.openSnackBar(str);

            if(response['user']['user_type'] == 'employee'){
                this.router.navigate(['/auth/login/employee']);
            }else if(response['user']['user_type'] == 'company'){
              this.router.navigate(['/auth/login/company']);
            }else if(response['user']['user_type'] == 'provider'){
                this.router.navigate(['/auth/login-provider']);
            }
        }

      })
  }


  send(){
      
    if(this.form.invalid) return;
    let value = {...this.form.value};

    this.isSending = true;
    this.apiService.post(Endpoints.request_forget_password, value)
    .pipe(
      finalize(() => this.isSending = false)
    )
    .subscribe( (response:any) => {
      //let {status} = response;
      //let {errors} = response;
      if(response['errors']){
       let str = this.translateService.instant(response['errors'].email);
        this.themeService.openSnackBar(str,'','error');
      }else if(response['status']){
        let str = this.translateService.instant(response['status']);
        this.themeService.openSnackBar(str);

      }
    })
  }

}
