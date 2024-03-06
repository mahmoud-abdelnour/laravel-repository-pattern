import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { ApiService } from 'src/shared/services/api.service';
import { Endpoints } from 'src/shared/services/endpoints';
import { ThemeService } from 'src/shared/services/theme.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  @Input('ref') ref;
  @Input('data') data;
  @Input('mode') mode;
  @Input('table') table;

  files;
  deleted_attachments:any = [];
  emp_files;
  constructor(
    private apiService:ApiService,
    private themeService:ThemeService,

  ) { }
  
  form:FormGroup;
  statusEnum;
  ngOnInit(): void {
    this.form = new FormGroup({
      task_title:new FormControl(null, Validators.required),
      task_period:new FormControl(null, [Validators.required, Validators.min(1)]),
      task_description:new FormControl(null),
      id:new FormControl(null),
    });
    if(this.data) this.form.patchValue(this.data);

    console.log(this.table);

    this.files = new FormGroup({});
    this.emp_files = new FormGroup({});

    

    let is_disabled = false;
    if(this.data?.attachments){
      for(let file of this.data?.attachments) {
        this.files.addControl("attachments_"+file.id, new FormControl( {value:file.file_url, disabled:is_disabled}) )
      }
    }

   
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
          formData.append(key, this.files.value[key], this.files.value.name);
        } 
      };
  }



  isSaving = false;
  save() {
    if(this.form.invalid) return;
    
    this.isSaving = true;
    let value = this.form.getRawValue();



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


    //(this.data ? this.apiService.put(Endpoints.provider.tasks + '/' + this.data.id, this.form.value) : this.apiService.post(Endpoints.provider.tasks, this.form.value) )
    (this.data ? this.apiService.uploadFiles(Endpoints.provider.tasks + '/' + this.data.id, formData) : this.apiService.uploadFiles(Endpoints.provider.tasks, formData) )
    .pipe(
      finalize(() => this.isSaving = false)
    ).subscribe( r => {
      this.themeService.openSnackBar('SavedSuccessfully', null);
      this.ref.close(true);
      this.table.reloadTable();

    })
  }

}
