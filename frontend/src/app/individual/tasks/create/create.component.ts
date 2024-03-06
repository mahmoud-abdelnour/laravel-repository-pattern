import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup,FormArray, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { ApiService } from 'src/shared/services/api.service';
import { Endpoints } from 'src/shared/services/endpoints';
import { ThemeService } from 'src/shared/services/theme.service';
import { HttpResponse } from '@angular/common/http';
import { AfterViewChecked, ChangeDetectorRef } from '@angular/core'

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  host: { class:'app-dialog' }
})
export class CreateComponent implements OnInit {
  @Input('data') data;
  @Input('ref') ref;
  @Input('table') table;

  form:FormGroup;
  files;
  isSaving;
  deleted_attachments:any = [];
  company_files;

  constructor(
    private apiService:ApiService,
    private themeService:ThemeService,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) { }


  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }


  ngOnInit(): void {
    this.files = new FormGroup({});
    this.company_files = new FormGroup({});
    this.form = new FormGroup({
      task_id : new FormControl(null),
      attachments : new FormControl(null),
    });


    let is_disabled = false;
    for(let file of this.data?.emp_attachments) {
      this.files.addControl("attachments_"+file.id, new FormControl( {value:file.file_url, disabled:is_disabled}) )
    }

    for(let file of this.data?.company_attachments) {
      this.company_files.addControl("attachments_"+file.id, new FormControl( {value:file.file_url, disabled:true}) )
    }
   
    //if(this.data.pivot.approved == this.themeService.settings.EMP_COURSE_STATUS.enum.approved) this.form.disable();
  }


  deleteAttachment(input){
    this.files.removeControl(input.key); 
    //console.log(this.files.controls[input.key]);
    this.deleted_attachments.push(input.key);
  }



  counter = 1;
  addAttach(){
    this.counter++;
   
    this.files.addControl('attachmentss_'+this.counter, new FormControl(null));
    

    /* this.form = new FormGroup({});
    for(let file of this.files) {
      this.form.addControl(file, new FormControl( {value:this.data[file+'_url'], disabled:true}) )
    }*/

  }

  



  add_task_attachments(id){

    //if(this.form.invalid) return;

    let value = {...this.form.value};
    let formData = new FormData();
    for(let key in value) {
      if(value[key] !== null){
        formData.append(key, value[key]);
      } 
    };


    formData.append('entity_id',id);
    formData.append('entity_type','employee');
    formData.append('deleted_attachments',this.deleted_attachments);
    

    for(let key in this.files.value) {
      if(this.files.value[key] !== null && typeof this.files.value[key] == 'object'){
        //console.log(this.files.value[key]);
        formData.append(key, this.files.value[key], this.files.value.name);
      } 
    };

    this.apiService.uploadFiles(Endpoints.provider.add_task_attachments, formData).subscribe( r => {
      if(r instanceof HttpResponse) {
        this.isSaving = false;
        this.themeService.openSnackBar('تم الإضافة بنجاح');
        this.ref.close(true);
        this.table.reloadTable();
      }
    }, e => this.isSaving = false);
    
  }



  process_task(action = null){

    if(this.form.invalid) return;

    let endpoint= null;
    if(action == 'start_task'){
       endpoint = Endpoints.employee.start_task;
    }else if(action == 'finish_task'){
       endpoint = Endpoints.employee.finish_task;
    }

    /*let formData = new FormData();
    let value = {...this.form.value};
    console.log(value);
    return;
    */

    /*formData.append('action', action);
      this.apiService.post(Endpoints.employee.resigns, formData)
    */
    
    this.isSaving = true;
    this.apiService.post(endpoint,{
      action:action,
      task_id:this.data.id
    })
    .pipe(
      finalize(() => this.isSaving = false)
    )
    .subscribe( r => {
      //console.log(r);
      this.ref.close(true);
      this.table.reloadTable();

    })
  }
}
