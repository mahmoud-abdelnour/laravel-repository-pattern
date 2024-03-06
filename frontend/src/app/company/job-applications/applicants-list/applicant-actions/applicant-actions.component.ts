import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { finalize } from 'rxjs';
import { ApiService } from 'src/shared/services/api.service';
import { Endpoints } from 'src/shared/services/endpoints';
import { ThemeService } from 'src/shared/services/theme.service';

@Component({
  selector: 'app-applicant-actions',
  templateUrl: './applicant-actions.component.html',
  styleUrls: ['./applicant-actions.component.scss'],
  host: {'class': 'list-actions-btns'}
})
export class ApplicantActionsComponent implements OnInit {
  parent;
  rowData;




  constructor(
    public themeService:ThemeService,
    private matDialog:MatDialog,
    private translateSerivce:TranslateService,
    private apiService:ApiService
  ) { }

  status
  ngOnInit(): void {
    this.status = this.themeService.settings.COMPANY_REPONSE_STATUS.enum;
  }


  changeValue(value) {
    if(value == this.status.rejected) {
      this.form.addControl('rejection_reason', new FormControl(null, Validators.required));
    } else this.form.removeControl('rejection_reason');
    this.form.updateValueAndValidity();
  }
  
  ref;
  openDialog(template) {
    this.createForm();
    this.ref = this.matDialog.open(template);
  }

  form:FormGroup;
  attachForm : FormGroup;
  createForm() {
    this.form = null;
    this.form = new FormGroup({
      response: new FormControl(this.status.accepted),
    });

    this.attachForm = new FormGroup({
      job_request_id: new FormControl(this.rowData.pivot.job_request_id),
      company_file: new FormControl(null, Validators.required),
      emp_id: new FormControl(this.rowData.pivot.emp_id),
    });

    if(!this.rowData.can_attach_insurance) {
      this.attachForm.controls['company_file'].patchValue(this.rowData.company_insurance?.company_file);
      this.attachForm.controls['company_file'].disable();
    }
  }

  save() {
    if(this.form.invalid) return;
    this.isSaving = true;

    // this.ref.close();
    // this.parent.save(this.rowData, this.form.value);
    this.apiService.put(Endpoints.company.admit_emp_request_candidate + '/' + this.rowData.pivot.id,this.form.value)
    .pipe(
      finalize(() => this.isSaving = false)
    )
    .subscribe( () => {
      this.ref.close()
      this.parent.table.reloadTable();
    })
  }


  isSaving;
  progress;
  saveFile() {
    if(this.attachForm.invalid) return;
    console.log(this.attachForm.value);
    this.isSaving = true;

    let formData = new FormData();
    let value = {...this.attachForm.value};

    formData.append('job_request_id', value.job_request_id);
    formData.append('emp_id', value.emp_id);
    if(value.company_file instanceof File) formData.append('company_file', value.company_file, value.company_file.name);
    else formData.append('company_file', value.company_file);

    this.progress = 0;

    this.apiService.uploadFiles(Endpoints.company.attach_insurance_file, formData, 'POST').subscribe( r => {
      if(r.type == 1) {
        this.progress =  (( r.loaded / r.total) * 100).toFixed(0)
      }
      if(r instanceof HttpResponse) {
        this.isSaving = false;
        this.themeService.openSnackBar(this.translateSerivce.instant('SavedSuccessfully'), null);
        this.ref.close();
        this.parent.table.reloadTable();
      }
    }, e => this.isSaving = false)
  }


  

}
