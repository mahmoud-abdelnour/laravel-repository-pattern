import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserType } from 'src/shared/enums/user-type';
import { ApiService } from 'src/shared/services/api.service';
import { Endpoints } from 'src/shared/services/endpoints';
import { UserService } from 'src/shared/services/user.service';
import { FileSaverService } from 'ngx-filesaver'; 
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ThemeService } from 'src/shared/services/theme.service';
import { TranslateService } from '@ngx-translate/core';
import { onlyInteger } from 'src/shared/functions/negative-number';

@Component({
  selector: 'app-provider-profile',
  templateUrl: './provider-profile.component.html',
  styleUrls: ['./provider-profile.component.scss']
})
export class ProviderProfileComponent implements OnInit {
  form:FormGroup;
  UserType = UserType;

  constructor(
    private apiService:ApiService,
    private userService:UserService,
    public  themeService:ThemeService,
    private translateSerivce:TranslateService
  ) {  }

  user;
  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.required]),
      mobile: new FormControl(null, Validators.required),
      name: new FormControl(null, Validators.required),
      national_id: new FormControl(null, [Validators.required, Validators.minLength(11), Validators.maxLength(11), onlyInteger()]),
      password: new FormControl(null),
      password_confirmation: new FormControl(null),

    });

    //this.form.disable();

    this.apiService.get( Endpoints.provider.profile).subscribe( r => {
      this.userService.userData = r.user;
      localStorage.setItem('user', JSON.stringify(r.user));
      this.form.patchValue(r.user);
    })
  }


  isSending = false;
  save() {
    //if(this.form.invalid) return;

    console.log('sssss');
    console.log(this.form.invalid);

    this.isSending = true;

    let formData = new FormData();
    let value = {...this.form.getRawValue()};

   /*  for(let key in value) {
      if(this.form.value[key] !== null) formData.append(key, this.form.value[key])
    }; */

   
    this.apiService.uploadFiles(Endpoints.provider.profile , value, 'POST').subscribe( r => {
      if(r instanceof HttpResponse) {
        this.isSending = false;
        this.themeService.openSnackBar(this.translateSerivce.instant('تم تعديل الملف الشخصى.'), null);
        //this.ngOnInit();
      }
    }, () => this.isSending = false)

  }

}