import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';
import { UserType } from 'src/shared/enums/user-type';
import { ApiService } from 'src/shared/services/api.service';
import { Endpoints } from 'src/shared/services/endpoints';
import { UserService } from 'src/shared/services/user.service';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.scss']
})
export class LoginAdminComponent implements OnInit {
  form:FormGroup;

  constructor(
    private apiService:ApiService,
    private router:Router,
    private userService:UserService,
    public activatedRoute:ActivatedRoute
    ) { }
    
  userType;
  ngOnInit(): void {
    this.form = new FormGroup({
      password : new FormControl(null, Validators.required),
      national_id : new FormControl(null, Validators.required),
      user_type: new FormControl(UserType.provider)
    });
  }


  isSending = false;
  login() {
    if(this.form.invalid) return;
    let value = {...this.form.value};

    this.isSending = true;
    this.apiService.post(Endpoints.login, value)
    .pipe(
      finalize(() => this.isSending = false)
    )
    .subscribe( (response:any) => {
      let {data} = response;
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('expires_at', data.expires_at);
      localStorage.setItem('token_type', data.token_type);
      localStorage.setItem('user', JSON.stringify(data.user));
      this.userService.userData = data.user;
      this.userService.userData.permissions = data.permissions;
      this.userService.setPermissions();
      this.router.navigate(['/home'])
    })
  }

}
