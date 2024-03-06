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
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  form:FormGroup;
  UserType = UserType;

  constructor(
    private apiService:ApiService,
    private userService:UserService,
    private fileSaverService:FileSaverService,
    private _http: HttpClient,
    public themeService:ThemeService,
    private translateSerivce:TranslateService
  ) {
    this.getAssets();
  }

  user;
  employeeFiles = [
    'national_id_file',
    'qualification_file',
    'national_address_file',
    'bank_ipan_file',
    'secret_approvement_file',
  ];

  companyFiles = [
   'commercial_record_file',
    'tax_registration_certificate_file',
    'national_address_file'
  ];

  files;


  employeeForm;
  companyForm;

  ngOnInit(): void {
    this.form = null;
    this.employeeForm = new FormGroup({
      national_id: new FormControl(null, [Validators.required, Validators.minLength(11), Validators.maxLength(11), onlyInteger()]),
      email: new FormControl(null, [Validators.required, Validators.required]),
      name_ar: new FormControl(null, Validators.required),
      name_en: new FormControl(null, Validators.required),
      mobile: new FormControl(null, Validators.required),
      gender: new FormControl(null, Validators.required),
      job_id:new FormControl(null, Validators.required),
      martial_status: new FormControl(null, Validators.required),
      qualification: new FormControl({value:null}, Validators.required),
      bank_name: new FormControl(null, Validators.required),
      bank_ipan: new FormControl(null, [Validators.required, onlyInteger()]),
      national_address_building_no: new FormControl(null, Validators.required),
      national_address_postal: new FormControl(null, Validators.required),
      national_address_extra: new FormControl(null, Validators.required),
      user_type : new FormControl(null),
      password : new FormControl(null),
      password_confirmation : new FormControl(null)
    });

    this.companyForm = new FormGroup({
      commercial_record: new FormControl(null, [Validators.required, onlyInteger()]),
      email: new FormControl(null, [Validators.required, Validators.required]),
      name_ar: new FormControl(null, Validators.required),
      name_en: new FormControl(null, Validators.required),
      mobile: new FormControl(null, Validators.required),
      // commercial_record: new FormControl(null, Validators.required),
      national_address_building_no: new FormControl(null, Validators.required),
      national_address_postal: new FormControl(null, Validators.required),
      national_address_extra: new FormControl(null, Validators.required),
      labor_office_company_id: new FormControl(null, Validators.required),
      insurance_office_company_id: new FormControl(null, Validators.required),
      password : new FormControl(null),
      password_confirmation : new FormControl(null)
    });

    this.apiService.get(this.userService.userData.user_type == UserType.employee ? Endpoints.employee.profile : Endpoints.company.profile).subscribe( r => {
      this.userService.userData = r.user;
      localStorage.setItem('user', JSON.stringify(r.user));

      this.user = {...r.user, ...r.user.entity};
      if(this.user.user_type == UserType.employee) {
        this.form = this.employeeForm;
        this.files  = this.employeeFiles
      } else {
        this.form = this.companyForm;
        this.files  = this.companyFiles
      }
      this.form.patchValue(this.user);

      for(let key of this.files) {
        if(this.user[key]) {
          this.form.addControl(key, new FormControl(this.user[key + '_url'], Validators.required)); 
        }
      }
    })
  }

  jobs;
  banks
  getAssets() {
    this.apiService.get(Endpoints.employee.jobs).subscribe(r => {
      this.jobs = r.jobs;
    })
    this.apiService.get(Endpoints.misc.banks).subscribe(r => {
      this.banks = r.banks;
    });
  }



  isSending = false;
  save() {
    if(this.form.invalid) return;

    this.isSending = true;
  
    let formData = new FormData();
    let value = {...this.form.getRawValue()};

    for(let key in value) {
      if(this.form.value[key] !== null) formData.append(key, this.form.value[key])
    };

    this.files.map(key => {
      formData.delete(key);
      if(this.form.value[key] instanceof File) formData.append(key, this.form.value[key], this.form.value[key].name);
    })

    this.apiService.uploadFiles(this.userService.userData.user_type == UserType.employee ? Endpoints.employee.updateProfile : Endpoints.company.updateProfile , formData, 'POST').subscribe( r => {
      if(r instanceof HttpResponse) {
        this.isSending = false;
        this.themeService.openSnackBar(this.translateSerivce.instant('تم تعديل الملف الشخصى.'), null);
        this.ngOnInit();
      }
    }, () => this.isSending = false)

  }

}