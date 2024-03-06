import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { FormMode } from 'src/shared/enums/form-mode';
import { ApiService } from 'src/shared/services/api.service';
import { Endpoints } from 'src/shared/services/endpoints';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  host: { class:'app-dialog' }
})
export class CreateComponent implements OnInit {
  @Input('mode') mode;
  @Input('ref') ref;
  @Input('data') data;

  FormMode = FormMode;


  form:FormGroup;

  constructor(
    private apiService:ApiService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
    });

    if(this.mode != FormMode.Create) {
      this.form.patchValue(this.data);
      if(this.mode == FormMode.View) this.form.disable();
    }
  }

  isSaving = false;
  save() {
    console.log(this.form);
    if(this.form.invalid) return;
    this.isSaving = true;
    let func =
      this.mode == FormMode.Create
        ? this.apiService.post(Endpoints.provider.roles, this.form.value)
        : this.apiService.put( `${Endpoints.provider.roles}/${this.data.id}`, this.form.value );
    func
    .pipe(
      finalize( () => this.isSaving = false)
    )
    .subscribe( r => {
      console.log(r);
      this.ref.close(r);
    })
  }

}
