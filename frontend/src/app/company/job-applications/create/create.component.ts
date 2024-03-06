import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { finalize } from 'rxjs';
import { FormMode } from 'src/shared/enums/form-mode';
import { ApiService } from 'src/shared/services/api.service';
import { Endpoints } from 'src/shared/services/endpoints';
import { ThemeService } from 'src/shared/services/theme.service';

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
  @Input('jobs') jobs;
  FormMode = FormMode;


  form:FormGroup;

  constructor(
    private apiService:ApiService,
    private themeService:ThemeService,
    private translateSerivce:TranslateService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      count: new FormControl(null, [Validators.required, Validators.min(1)]),
      job_id: new FormControl(null, Validators.required),
      notes: new FormControl(null),
    });

    if(this.mode !== FormMode.Create) {
      this.form.patchValue(this.data);
      if(this.mode == FormMode.View) this.form.disable();
    }

  }


  isSaving = false;
  save() {

    if(this.form.invalid) return;

    this.isSaving = true;
    let req =
      this.mode == FormMode.Create
        ? this.apiService.post(Endpoints.company.emp_requests, this.form.value)
        : this.apiService.put(
          Endpoints.company.emp_requests + '/' + this.data.id,
          this.form.value
        );
    req.pipe(
      finalize(() => this.isSaving = false)
    ).subscribe( r => {
      this.themeService.openSnackBar(this.translateSerivce.instant('SavedSuccessfully'), null);
      this.ref.close(true);
    })
  }

}
