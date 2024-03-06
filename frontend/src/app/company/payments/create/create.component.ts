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

  constructor(
    private apiService: ApiService,
    private translateSerivce:TranslateService,
    private themeService:ThemeService
  ) {}

  form: FormGroup;
  fileName;
  ngOnInit(): void {
    console.log(this.data);
    this.form = new FormGroup({
      payment_amount: new FormControl(null, Validators.required),
      payment_file: new FormControl(null, Validators.required),
      notes: new FormControl(null),
      id:new FormControl(null),
    });

    if(this.mode !== FormMode.Create) {
      // this.fileName = this.data.payment_file.substr(this.data.payment_file.lastIndexOf('/') + 1)
      this.form.patchValue(this.data);
      if(this.mode == FormMode.View) this.form.disable();
    }
  }

  
  // file;
  // fileSize;
  // fileChanged(ev) {
  //   this.file = ev.target.files[0];
  //   this.fileSize = (this.file.size / 1000000).toFixed(2);
  //   this.form.controls['payment_file'].setValue(ev.target.files[0])
  // }

  // deleteFile(input) {
  //   this.file = null;
  //   input.type = '';
  //   input.type = 'file';
  //   this.form.controls['payment_file'].setValue(null)
  // }


  isSaving = false;
  save() {
    if(this.form.invalid) return;
    console.log(this.form.value);
    this.isSaving = true;

    let formData = new FormData();
    let value = {...this.form.value};

    formData.append('payment_amount', value.payment_amount);
    formData.append('notes', value.notes);
    formData.append('id', value.id);

    if(value.payment_file instanceof File) formData.append('payment_file', value.payment_file, value.payment_file.name);
    else formData.append('payment_file', value.payment_file);

    let url = Endpoints.company.makePayment;
    // if(this.data) url = Endpoints.company.update_payment + '/' + this.data.id;

    this.apiService.uploadFiles(url, formData, 'POST').subscribe( r => {
      if(r instanceof HttpResponse) {
        this.isSaving = false;
        this.themeService.openSnackBar(this.translateSerivce.instant('SavedSuccessfully'), null);
        this.ref.close(true);
      }
    }, e => this.isSaving = false)

  }
}
