import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { compareValues } from 'src/shared/functions/validate-password.function';
import { UserType } from 'src/shared/enums/user-type';
import { requiredCheck } from 'src/shared/functions/required-check';
import { ApiService } from 'src/shared/services/api.service';
import { Endpoints } from 'src/shared/services/endpoints';
import { TranslateService } from '@ngx-translate/core';
import { langFunc } from 'src/shared/functions/lang.functions';
import { Subscription } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { onlyInteger,NoZeros,Iban } from 'src/shared/functions/negative-number';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  @ViewChild('stepper') stepper;
  tabs = {
    activeTab : 1
  }

  registered_in_remote_work_platform = new FormControl(null);
  emp_filesForm: FormGroup;
  comp_filesForm: FormGroup;
  UserType = UserType;
  
  constructor(
    private apiService:ApiService,
    private translateService:TranslateService,
    private router:Router,
    public activatedRoute:ActivatedRoute
  ) { }

  ngOnDestroy(): void {
   for(let sub of this.subscription) if(sub) sub.unsubscribe();
  }
  
  defaultLang;
  changeLang(lang) {
    this.translateService.use(lang);
    this.defaultLang = langFunc(this.translateService.defaultLang)
  }

  stepOneForm:FormGroup;
  employeeForm:FormGroup;
  companyForm:FormGroup;
  stepTwoForm:FormGroup;
  
  jobs;
  banks;
  filesform:FormGroup;


  ngOnInit(): void {
    this.defaultLang = langFunc(this.translateService.defaultLang);

    this.getAssets();
    this.initForms();
  }

  getAssets() {
    this.apiService.get(Endpoints.employee.jobs).subscribe(r => {
      this.jobs = r.jobs;
    })
    this.apiService.get(Endpoints.misc.banks).subscribe(r => {
      this.banks = r.banks;
    });
  }

  initForms() {

    this.stepOneForm = new FormGroup({
      user_type:new FormControl(this.activatedRoute.snapshot.data['userType'] || UserType.employee, Validators.required),
      national_id: new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(10), onlyInteger()]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      password_confirmation: new FormControl(null, Validators.required),
      acceptTerms:new FormControl(null, [Validators.required, requiredCheck()])
    }, {
      validators:[compareValues('password', 'password_confirmation')]
    });



    this.employeeForm = new FormGroup({
      name_ar: new FormControl(null, Validators.required),
      name_en: new FormControl(null, Validators.required),
      mobile: new FormControl(null, Validators.required),
      gender: new FormControl(null, Validators.required),
      //job_id:new FormControl(null, Validators.required),
      martial_status: new FormControl(null, Validators.required),
      qualification: new FormControl(null, Validators.required),
      bank_name: new FormControl(null, Validators.required),
      bank_ipan: new FormControl(null, [Validators.required, onlyInteger(),onlyInteger()]),
      national_address_building_no: new FormControl(null, [Validators.required,NoZeros()]),
      national_address_postal: new FormControl(null, [Validators.required,NoZeros()]),
      national_address_extra: new FormControl(null, [Validators.required,NoZeros()]),
    });

    this.companyForm = new FormGroup({
      name_ar: new FormControl(null, Validators.required),
      name_en: new FormControl(null, Validators.required),
      mobile: new FormControl(null, Validators.required),
      // commercial_record: new FormControl(null, Validators.required),
      national_address_building_no: new FormControl(null, [Validators.required,NoZeros()]),
      national_address_postal: new FormControl(null, [Validators.required,NoZeros()]),
      national_address_extra: new FormControl(null, [Validators.required,NoZeros()]),
      labor_office_company_id: new FormControl(null, Validators.required),
      insurance_office_company_id: new FormControl(null, Validators.required),
    });


    this.emp_filesForm = new FormGroup({
      national_id_file: new FormControl(null, Validators.required),
      qualification_file: new FormControl(null, Validators.required),
      national_address_file: new FormControl(null, Validators.required),
      bank_ipan_file: new FormControl(null, Validators.required),
      secret_approvement_file: new FormControl(null, Validators.required),
    });
  
    this.comp_filesForm = new FormGroup({
      commercial_record_file: new FormControl(null, Validators.required),
      tax_registration_certificate_file: new FormControl(null, Validators.required),
      national_address_file: new FormControl(null, Validators.required),
    });

    if(this.stepOneForm.controls['user_type'].value == UserType.company) {
      this.stepOneForm.addControl('commercial_record', new FormControl(null, Validators.required));
      this.stepOneForm.removeControl('national_id');
      this.stepOneForm.updateValueAndValidity();

      this.stepTwoForm = this.companyForm;
      this.filesform = this.comp_filesForm;
    } else {
      this.stepTwoForm = this.employeeForm;
      this.filesform = this.emp_filesForm
    }

  }

  subscription:Subscription[] = [];
  isSending = false;
  progress;
  submit() {
    if(this.isSending) return;
    if(this.stepOneForm.invalid || this.stepTwoForm.invalid || this.filesform.invalid) return;
    this.isSending = true;
    let value = {
      ...this.stepOneForm.value,
      ...this.stepTwoForm.value,
      registered_in_remote_work_platform:+this.registered_in_remote_work_platform.value
    }
    let formData = new FormData();
    for(let key in value) {
      if(value[key] !== null) formData.append(key, value[key])
    };

    for(let key in this.filesform.value) {
      if(this.filesform.value[key] !== null) formData.append(key, this.filesform.value[key], this.filesform.value.name);
    };

    let url = value.user_type == UserType.employee ?  Endpoints.registerEmployee : Endpoints.registerCompany ;
    
    this.progress = 0;
    this.subscription.push( 
      this.apiService.uploadFiles(url, formData).subscribe( r => {
        if(r.type == 1) {
          this.progress =  (( r.loaded / r.total) * 100).toFixed(0)
        }
        if(r instanceof HttpResponse) {
          this.isSending = false;
          this.router.navigate(['/auth/register/registration-success'], {queryParams:{userType:this.stepOneForm.controls['user_type'].value}})
        }
      }, e => this.isSending = false)
    )
  }



}

