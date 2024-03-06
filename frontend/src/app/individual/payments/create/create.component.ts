import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { ApiService } from 'src/shared/services/api.service';
import { Endpoints } from 'src/shared/services/endpoints';
import * as locale from '@angular/common/locales/ar-SA';
import { TranslateService } from '@ngx-translate/core';
import { HttpResponse } from '@angular/common/http';
import { ThemeService } from 'src/shared/services/theme.service';
import { FormMode } from 'src/shared/enums/form-mode';
import { UserService } from 'src/shared/services/user.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  host: { class:'app-dialog' }
})
export class CreateComponent implements OnInit {
  @Input('data') data;
  @Input('mode') mode;
  @Input('ref') ref;
  FormMode = FormMode;

  months = [
    { name: 'يناير', id: 0 },
    { name: 'فبراير', id: 1 },
    { name: 'مارس', id: 2 },
    { name: 'إبريل', id: 3 },
    { name: 'مايو', id: 4 },
    { name: 'يونيو', id: 5 },
    { name: 'يوليو', id: 6 },
    { name: 'أغسطس', id: 7 },
    { name: 'سبتمبر', id: 8 },
    { name: 'أكتوبر', id: 9 },
    { name: 'نوفمبر', id: 10 },
    { name: 'ديسمبر', id: 11 },
  ];
  
  constructor(
    private apiService: ApiService,
    private translateSerivce:TranslateService,
    public themeService:ThemeService,
    public userService:UserService
  ) {}

  form: FormGroup;
  fileName;
  firstTime = false;

  ngOnInit(): void {
    console.log(this.data);
    this.form = new FormGroup({
      payment_amount: new FormControl(null, Validators.required),
      payment_file: new FormControl(null, Validators.required),
      month: new FormControl(null, Validators.required),
      notes: new FormControl(null),
      subscription_type: new FormControl(this.themeService.settings.SUBSCRIPTION_TYPE.enum.courses),
      id:new FormControl(null),
    });
    //this.userService.userData.entity.status = this.themeService.settings.EMPLOYEE_STATUS.enum.pending;
    this.firstTime = this.userService.userData.entity.status == this.themeService.settings.EMPLOYEE_STATUS.enum.pending;
    if(this.firstTime) {
      //this.form.controls['subscription_type'].setValue(this.themeService.settings.SUBSCRIPTION_TYPE.enum.membership);
      //this.form.controls['subscription_type'].disable();
    }
    if(this.mode !== FormMode.Create) {
      this.fileName = this.data.payment_file.substr(this.data.payment_file.lastIndexOf('/') + 1)
      this.form.patchValue(this.data);
      if(this.mode == FormMode.View) this.form.disable();
    }
  }

  changeType(ev) {
    console.log(ev);
    this.form.controls['month'].setValidators(ev.value == 'courses' ? Validators.required : null);
    if(ev.value != 'courses') this.form.controls['month'].setValue( null );
    this.form.controls['month'].updateValueAndValidity();
  }
  
  file;
  fileSize;
  fileChanged(ev) {
    this.file = ev.target.files[0];
    this.fileSize = (this.file.size / 1000000).toFixed(2);
    this.form.controls['payment_file'].setValue(ev.target.files[0])
  }

  deleteFile(input) {
    this.file = null;
    input.type = '';
    input.type = 'file';
    this.form.controls['payment_file'].setValue(null)
  }


  isSaving = false;
  save() {
    console.log(this.form);
    console.log(this.form.invalid);
    console.log(this.form.value);
    if(this.form.invalid) return;

    this.isSaving = true;

    let formData = new FormData();
    let value = {...this.form.value};

    formData.append('payment_amount', value.payment_amount);
    //formData.append('month', value.month);
    formData.append('subscription_type', value.subscription_type);
    formData.append('notes', value.notes);
    formData.append('id', value.id);
    if(this.file) formData.append('payment_file', this.file, this.file.name);
    else formData.append('payment_file', value.payment_file);

    let url = Endpoints.employee.makePayment;
    if(this.data) url = Endpoints.employee.update_payment + '/' + this.data.id;

    this.apiService.uploadFiles(url, formData, 'POST').subscribe( r => {
      if(r instanceof HttpResponse) {
        this.isSaving = false;
        this.themeService.openSnackBar(this.translateSerivce.instant('SavedSuccessfully'), null);
        this.ref.close(true);
      }
    }, e => this.isSaving = false)

  }
}
