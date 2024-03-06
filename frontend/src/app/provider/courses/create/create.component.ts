import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  constructor(
    private apiService:ApiService,
    private themeService:ThemeService
  ) { }
  
  form:FormGroup;
  ngOnInit(): void {
    this.form = new FormGroup({
      course_title:new FormControl(null, Validators.required),
      period:new FormControl(null, [Validators.required, Validators.min(1)]),
      price:new FormControl(null, [Validators.required, Validators.min(0)]),
      course_contract:new FormControl(null, Validators.required),
      course_description:new FormControl(null),
      id:new FormControl(null),
    });
    if(this.data) this.form.patchValue(this.data);
  }


  isSaving = false;
  save() {
    console.log(this.form)
    if(this.form.invalid) return;
    (this.data ? this.apiService.put(Endpoints.provider.courses + '/' + this.data.id, this.form.value) : this.apiService.post(Endpoints.provider.courses, this.form.value) )
    .pipe(
      finalize(() => this.isSaving = false)
    ).subscribe( r => {
      this.themeService.openSnackBar('SavedSuccessfully', null);
      this.ref.close(true)
    })
  }

}
