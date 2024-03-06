import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { FormMode } from 'src/shared/enums/form-mode';
import { ApiService } from 'src/shared/services/api.service';
import { Endpoints } from 'src/shared/services/endpoints';
import { ThemeService } from 'src/shared/services/theme.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss'],
  providers:[
    DatePipe
  ]
})
export class TaskDialogComponent implements OnInit {
  @Input('ref') ref;
  @Input('data') data;
  @Input('employees') employees;
  @Input('mode') mode;
  @Input('employeeId') employeeId;
  @Input('table') table;

  constructor(
    private apiService:ApiService,
    private datePipe:DatePipe,
    private themeService:ThemeService
  ) { }
  FormMode = FormMode;
  form:FormGroup;
  tasks;
  files;
  deleted_attachments:any = [];
  emp_files;
  task_files;
  ngOnInit(): void {
    this.form = new FormGroup({
      task_id: new FormControl(null, Validators.required),
      emp_id: new FormControl(null, Validators.required),
      due_date: new FormControl(null, [Validators.required]),
      notes:new FormControl(null),
      attachments : new FormControl(null),
      
    });
    this.files = new FormGroup({});
    this.emp_files = new FormGroup({});
    this.task_files = new FormGroup({});



    let is_disabled = false;
    if(this.data?.company_attachments){
      for(let file of this.data?.company_attachments) {
        this.files.addControl("attachments_"+file.id, new FormControl( {value:file.file_url, disabled:is_disabled}) )
      }
    }

    if(this.data?.emp_attachments){
      for(let emp_file of this.data?.emp_attachments) {
        this.emp_files.addControl("attachments_"+emp_file.id, new FormControl( {value:emp_file.file_url, disabled:true}) )
      }
    }

    if(this.data?.task?.attachments){
      for(let task_file of this.data?.task?.attachments) {
        this.task_files.addControl("attachments_"+task_file.id, new FormControl( {value:task_file.file_url, disabled:true}) )
      }
    }




    if(this.data) {
      this.getTasks(this.data.emp_id);
      this.data.due_date = new Date(this.data.due_date)
      this.form.patchValue(this.data);
      this.form.disable();
      this.form.controls['due_date'].enable();
    }
    if(this.employeeId) {
      this.getTasks(this.employeeId);
      this.form.controls['emp_id'].setValue(this.employeeId)
    }

    if(this.mode == FormMode.View) this.form.disable()
    console.log(this.employeeId)
    console.log(this.data)
  }

  
  deleteAttachment(input){
    this.files.removeControl(input.key); 
    this.deleted_attachments.push(input.key);
  }


  counter = 1;
  addAttach(){
    this.counter++;
    this.files.addControl('attachmentss_'+this.counter, new FormControl(null));
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

    
  }


  activeTask;
  tasksObj = {};
  getTasks(empId) {
    this.activeTask = null;
    this.tasksObj = {};
    if(empId == null ) return;
    this.apiService.get(Endpoints.misc.emp_tasks + '/' + empId).subscribe( r => {
      console.log(r)
      this.tasks = r.tasks || [];
      let isTaskExist = false;
      for(let task of this.tasks) {
        this.tasksObj[task.id] = task;
        if(this.form.controls['task_id'].value == task.id) {
          isTaskExist = true;
          this.activeTask = task;
        }
      }
      if(!isTaskExist) this.form.controls['task_id'].setValue(null);
    });
  }

  isSaving = false;
  save() {
    if(this.form.invalid) return;
    
    this.isSaving = true;
    let value = this.form.getRawValue();
    value.due_date = this.datePipe.transform(new Date(), 'yyyy/MM/dd');



    let formData = new FormData();
    for(let key in value) {
      if(value[key] !== null){
        formData.append(key, value[key]);
      } 
    };

    formData.append('entity_id',this.data?.id);
    formData.append('entity_type','employee');
    formData.append('deleted_attachments',this.deleted_attachments);
    

    for(let key in this.files.value) {
      if(this.files.value[key] !== null && typeof this.files.value[key] == 'object'){
        console.log(this.files.value[key]);
        formData.append(key, this.files.value[key], this.files.value.name);
      } 
    };


 

    (this.data ? this.apiService.uploadFiles(Endpoints.company.emp_task + '/' + this.data.id, formData) :  this.apiService.post(Endpoints.company.assign_emp_task, formData))
    .pipe(
      finalize(( ) => this.isSaving = false)
    )
    .subscribe(r => {
      this.themeService.openSnackBar('SavedSuccessfully', null);
      this.ref.close(true);
      if(this.table){
        this.table.reloadTable();
      }

    })
  }

}