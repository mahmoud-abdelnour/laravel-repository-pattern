import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { onlyInteger,NoZeros,Iban } from 'src/shared/functions/negative-number';
import { compareValues } from 'src/shared/functions/validate-password.function';
import { ApiService } from 'src/shared/services/api.service';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ThemeService } from 'src/shared/services/theme.service';
import { Subscription } from 'rxjs';
import { Endpoints } from 'src/shared/services/endpoints';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  constructor(
    private apiService:ApiService,
    private translateService:TranslateService,
    private router:Router,
    public activatedRoute:ActivatedRoute,
    public themeService:ThemeService

  ){ 

  }



  form:FormGroup;
  
  jobs;
  banks;
  filesform:FormGroup;
  files:FormGroup;
  ngOnInit(): void {

    this.files = new FormGroup({
     /*  national_id_file: new FormControl(null, Validators.required),
      qualification_file: new FormControl(null, Validators.required),
      national_address_file: new FormControl(null, Validators.required),
      bank_ipan_file: new FormControl(null, Validators.required),
      secret_approvement_file: new FormControl(null, Validators.required), */

      national_id_file: new FormControl(null),
      qualification_file: new FormControl(null),
      national_address_file: new FormControl(null),
      bank_ipan_file: new FormControl(null),
      secret_approvement_file: new FormControl(null),
    });



    this.form = new FormGroup({
      national_id: new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(10), onlyInteger()]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      password_confirmation: new FormControl(null, Validators.required),
      
      name_ar: new FormControl(null, Validators.required),
      name_en: new FormControl(null, Validators.required),
      mobile: new FormControl(null, Validators.required),
      gender: new FormControl(null, Validators.required),
      martial_status: new FormControl(null, Validators.required),
      qualification: new FormControl(null, Validators.required),
      bank_name: new FormControl(null, Validators.required),
      bank_ipan: new FormControl(null, [Validators.required, Iban()]),
      national_address_building_no: new FormControl(null, [Validators.required,NoZeros()]),
      national_address_postal: new FormControl(null, [Validators.required,NoZeros()]),
      national_address_extra: new FormControl(null, [Validators.required,NoZeros()]),
    },{
      validators:[compareValues('password', 'password_confirmation')]
    });


    this.apiService.get(Endpoints.employee.jobs).subscribe(r => {
      this.jobs = r.jobs;
    })
    this.apiService.get(Endpoints.misc.banks).subscribe(r => {
      this.banks = r.banks;
    });

  }



  ngOnDestroy(): void {
    for(let sub of this.subscription) if(sub) sub.unsubscribe();
  }


  subscription:Subscription[] = [];
  isSending = false;
  progress;
  save(){
    /* if(this.isSending) return;
    if(this.form.invalid) return; */
    this.isSending = true;

    let value = {
      ...this.form.value,
    }


    let formData = new FormData();
    for(let key in value) {
      if(value[key] !== null){
        console.log(value[key]);
        formData.append(key, value[key]);
      } 
    };

    formData.append('source','provider');
    formData.append('user_type','employee');

    for(let key in this.files.value) {
      if(this.files.value[key] !== null){
        console.log(this.files.value[key]);
        formData.append(key, this.files.value[key], this.files.value.name);
      } 
    };

    let url =  Endpoints.provider.registerEmployee ;

    
    this.progress = 0;
    this.subscription.push( 
      this.apiService.uploadFiles(url, formData).subscribe( r => {
        if(r.type == 1) {
          this.progress =  (( r.loaded / r.total) * 100).toFixed(0)
        }
        if(r instanceof HttpResponse) {
          this.isSending = false;
          this.router.navigate(['/provider/candidates/list'])
          this.themeService.openSnackBar('تم الإضافة بنجاح');
        }
      }, e => this.isSending = false)
    )
  }

  cancel(){
    this.router.navigate(['/provider/candidates/list'])
  }

}
