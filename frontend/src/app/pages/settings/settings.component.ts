import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/shared/services/user.service';
import { ApiService } from 'src/shared/services/api.service';
import { Endpoints } from 'src/shared/services/endpoints';
import { Subscription, finalize } from 'rxjs';
import { ThemeService } from 'src/shared/services/theme.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(
    private apiService:ApiService,
    public userService:UserService,
    public themeService:ThemeService

  ) { }
    settings;
  form:FormGroup;
  ngOnInit(): void {
    this.form = new FormGroup({
      task_assign_method: new FormControl(null, Validators.required),
      task_period_method: new FormControl(null, Validators.required),
      task_period: new FormControl(null),
      send_telework_report: new FormControl(null),

      conditions_page: new FormControl(null),
      privacy_page: new FormControl(null),
      terms_page: new FormControl(null),
        
    });


    this.apiService.get(Endpoints.provider.settings)
    .pipe(
      finalize(( ) => this.isSaving = false)
    ).subscribe(r => {
      this.settings = r.settings;
      this.form.controls['task_assign_method'].setValue( this.settings.task_assign_method );
      this.form.controls['task_period_method'].setValue( this.settings.task_period_method );
      this.form.controls['task_period'].setValue( this.settings.task_period );
      this.form.controls['send_telework_report'].setValue( this.settings.send_telework_report );

      this.form.controls['conditions_page'].setValue( this.settings.conditions_page );
      this.form.controls['privacy_page'].setValue( this.settings.privacy_page );
      this.form.controls['terms_page'].setValue( this.settings.terms_page );
      this.task_period_method = this.settings.task_period_method ;
    })
  }

  task_period_method;
  changeType(ev) {
    console.log(ev);
    if(ev.value == 'manual' ){
      this.task_period_method = 'manual';
    }else{
      this.task_period_method = 'automatic';
    }


    this.form.controls['task_period'].setValidators(ev.value == 'manual' ? Validators.required : null);
    if(ev.value != 'manual') this.form.controls['task_period'].setValue( null );
    this.form.controls['task_period'].updateValueAndValidity();

  }

  isSaving;
  save() {
    
    console.log(this.form);

    if(this.form.invalid) return;

    this.isSaving = true;
    this.apiService.post(Endpoints.provider.updateSettings, this.form.value)
    .pipe(
      finalize(( ) => this.isSaving = false)
    ).subscribe(r => {
      this.themeService.openSnackBar('تم التحديث بنجاح', null);
    })
  }
}
