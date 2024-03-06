import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { finalize } from 'rxjs';
import { ApiService } from 'src/shared/services/api.service';
import { Endpoints } from 'src/shared/services/endpoints';
import { ThemeService } from 'src/shared/services/theme.service';

@Component({
  selector: 'app-assign-task',
  templateUrl: './assign-task.component.html',
  styleUrls: ['./assign-task.component.scss']
})
export class AssignTaskComponent implements OnInit {
  @Input('data') data;
  @Input('ref') ref;
  
  constructor(
    private apiService:ApiService,
    private themeService:ThemeService
  ) { }
  
  form:FormGroup;
  tasks;
  ngOnInit(): void {
    this.form = new FormGroup({
      job_id:new FormControl(this.data.id),
      tasks:new FormControl(null),
    });

    console.log(this.data);
    if(this.data) this.form.controls['tasks'].setValue((this.data.tasks || []).map(x => x.id));
    
    this.apiService.get(Endpoints.provider.tasks,{limit:false}).subscribe(r => {
      this.tasks = r.data;
    })
  }


  isSaving = false;
  save() {
    console.log(this.form);
    if(this.form.invalid) return;
    let value = {...this.form.value};
    value.tasks = value.tasks.map(String)
    this.apiService.post(Endpoints.provider.assign_tasks, value).pipe(
      finalize(() => this.isSaving = false)
    ).subscribe( r => {
      this.themeService.openSnackBar('SavedSuccessfully', null);
      this.ref.close(true)
    })
  }

}
