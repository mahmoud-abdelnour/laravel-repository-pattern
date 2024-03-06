import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { FormMode } from 'src/shared/enums/form-mode';
import { compareValues } from 'src/shared/functions/validate-password.function';
import { ApiService } from 'src/shared/services/api.service';
import { Endpoints } from 'src/shared/services/endpoints';

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
  FormMode = FormMode;


  form:FormGroup;

  constructor(
    private apiService:ApiService
  ) { }

  roles;
  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      mobile: new FormControl(null, Validators.required),
      national_id: new FormControl(null, Validators.required),
      roles: new FormControl(null),
    },);

    if(this.mode == FormMode.Create) {
      this.form.addControl('password', new FormControl(null, Validators.required));
      this.form.addControl('password_confirmation', new FormControl(null, Validators.required));
      this.form.addValidators([compareValues('password', 'password_confirmation')]);
      this.form.updateValueAndValidity();
    } else {
      this.form.patchValue(this.data);
      this.form.controls['roles'].patchValue(this.data.roles.map(r => r.id));
      if(this.mode == FormMode.View) this.form.disable();
    }

    this.apiService.get(Endpoints.provider.roles, {limit:false}).subscribe( r => {
      console.log('rr', r)
      this.roles = r.data
    })

  }

  isSaving = false;
  save() {
    console.log(this.form);
    if(this.form.invalid) return;
    this.isSaving = true;
    let func =
      this.mode == FormMode.Create
        ? this.apiService.post(Endpoints.provider.users, this.form.value)
        : this.apiService.put( `${Endpoints.provider.users}/${this.data.id}`, this.form.value );
    func
    .pipe(
      finalize( () => this.isSaving = false)
    )
    .subscribe( r => {
      console.log(r);
      this.ref.close(r);
    })
  }

  changeTab( tabs) {
    tabs.realignInkBar();
    // console.log(tabs)
  }

}
