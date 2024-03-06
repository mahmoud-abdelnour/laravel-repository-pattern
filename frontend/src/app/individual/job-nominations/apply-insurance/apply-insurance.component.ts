import { HttpResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { finalize } from 'rxjs';
import { ApiService } from 'src/shared/services/api.service';
import { Endpoints } from 'src/shared/services/endpoints';
import { ThemeService } from 'src/shared/services/theme.service';

@Component({
  selector: 'app-apply-insurance',
  templateUrl: './apply-insurance.component.html',
  styleUrls: ['./apply-insurance.component.scss']
})
export class ApplyInsuranceComponent implements OnInit {
  @Input('data') data;
  @Input('ref') ref;
  
  constructor(
    private apiService:ApiService,
    private themeService:ThemeService,
    private translateSerivce:TranslateService
  ) { }

  attachForm : FormGroup;
  ngOnInit(): void {

    this.attachForm = new FormGroup({
      job_request_id: new FormControl(this.data.pivot.job_request_id),
      emp_file: new FormControl(null, Validators.required),
    });

    if(this.data.insurance?.emp_file_url) {
      this.attachForm.controls['emp_file'].patchValue(this.data.insurance?.emp_file_url);
      this.attachForm.controls['emp_file'].disable();
    }
  }

  isSaving;
  progress;
  saveFile() {
    if(this.attachForm.invalid) return;
    this.isSaving = true;

    let formData = new FormData();
    let value = {...this.attachForm.value};

    formData.append('job_request_id', value.job_request_id);
    formData.append('emp_id', value.emp_id);
    if(value.emp_file instanceof File) formData.append('emp_file', value.emp_file, value.emp_file.name);
    else formData.append('emp_file', value.emp_file);

    this.progress = 0;

    this.apiService.uploadFiles(Endpoints.employee.attach_insurance_file, formData, 'POST').subscribe( r => {
      if(r.type == 1) {
        this.progress =  (( r.loaded / r.total) * 100).toFixed(0)
      }
      if(r instanceof HttpResponse) {
        this.isSaving = false;
        this.themeService.openSnackBar(this.translateSerivce.instant('SavedSuccessfully'), null);
        this.ref.close(true);
      }
    }, e => this.isSaving = false)
  }


}
