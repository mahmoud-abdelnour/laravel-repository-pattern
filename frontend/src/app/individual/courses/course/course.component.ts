import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { requiredCheck } from 'src/shared/functions/required-check';
import { ApiService } from 'src/shared/services/api.service';
import { Endpoints } from 'src/shared/services/endpoints';
import { ThemeService } from 'src/shared/services/theme.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
  host: { class:'app-dialog' }
})
export class CourseComponent implements OnInit {
  @Input('data') data;
  @Input('ref') ref;
  
  form:FormGroup;

  constructor(
    private apiService:ApiService,
    private themeService:ThemeService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      acceptTerms:new FormControl(null, [Validators.required, requiredCheck()])
    },
    //  {
    //   validators:[ requiredCheck('acceptTerms') ]
    // }
    );

    if(this.data.pivot.approved == this.themeService.settings.EMP_COURSE_STATUS.enum.approved) this.form.disable();
  }

  isSaving;
  save() {
    if(this.form.invalid) return;
    
    this.isSaving = true;
    this.apiService.post(Endpoints.employee.accept_course_contract,
    {
      course_id:this.data.id,
      contract_content:this.data.course_contract_value
    })
    .pipe(
      finalize(() => this.isSaving = false)
    )
    .subscribe( r => {
      console.log(r);
      this.ref.close(true)
    })
  }
}

