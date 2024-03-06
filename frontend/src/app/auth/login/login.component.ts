import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { UserType } from 'src/shared/enums/user-type';
import { ApiService } from 'src/shared/services/api.service';
import { Endpoints } from 'src/shared/services/endpoints';
import { UserService } from 'src/shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form:FormGroup;
  UserType = UserType;


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
    public activatedRoute:ActivatedRoute
    ) { }
    
  userType;
  ngOnInit(): void {
    this.userType = this.activatedRoute.snapshot.data['userType'];

    // this.form = new FormGroup({
    //   national_id : new FormControl(null, Validators.required),
    //   commercial_record:new FormControl(null),
    //   password : new FormControl(null, Validators.required),
    // });

    this.createForm();
  }

  createForm() {
    this.form = new FormGroup({
      password : new FormControl(null, Validators.required),
    });
    if(this.userType == UserType.employee) {
      this.form.addControl('national_id', new FormControl(null, Validators.required))
    } else {
      this.form.addControl('commercial_record', new FormControl(null, Validators.required))
    }
    this.form.updateValueAndValidity();
  }

  // index = 0;
  // changeTab(index) {
  //   console.log(index);
  //   if(index  == 1) {
  //     this.form.controls['commercial_record'].setValidators(Validators.required);
  //     this.form.controls['national_id'].setValidators(null);

  //   } else {
  //     this.form.controls['national_id'].setValidators(Validators.required);
  //     this.form.controls['commercial_record'].setValidators(null);
  //   }
  //   this.form.controls['national_id'].updateValueAndValidity();
  //   this.form.controls['commercial_record'].updateValueAndValidity();
  //   this.index = index;
  // }

  isSending = false;
  login() {
    console.log(this.form);
    
    if(this.form.invalid) return;
    let value = {...this.form.value};
    // if(this.index === 1) delete value.national_id;
    // else delete value.commercial_record;

    this.isSending = true;
    this.apiService.post(Endpoints.login, value)
    .pipe(
      finalize(() => this.isSending = false)
    )
    .subscribe( (response:any) => {
      let {data} = response;
      console.log(data);
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('expires_at', data.expires_at);
      localStorage.setItem('token_type', data.token_type);
      localStorage.setItem('user', JSON.stringify(data.user));
      this.userService.userData = data.user;
      this.router.navigate(['/home'])
    })
  }

}
