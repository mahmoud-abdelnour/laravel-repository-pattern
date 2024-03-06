import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription, finalize } from 'rxjs';
import { FormMode } from 'src/shared/enums/form-mode';
import { UserType } from 'src/shared/enums/user-type';
import { ApiService } from 'src/shared/services/api.service';
import { Endpoints } from 'src/shared/services/endpoints';
import { UserService } from 'src/shared/services/user.service';

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
  UserType = UserType;
  
  constructor(
    private apiService:ApiService,
    public userService:UserService,
  ) {
    UserType.provider
  }



  form:FormGroup;
  ngOnInit(): void {
    this.form = new FormGroup({
      message_title: new FormControl(null, Validators.required),
      message_content: new FormControl(null, Validators.required),
      user_type: new FormControl(this.userService.userData.user_type !== UserType.provider ? UserType.provider : UserType.employee, Validators.required),
      message_to: new FormControl(this.userService.userData.user_type !== UserType.provider ? UserType.provider : null, this.userService.userData.user_type === UserType.provider ? Validators.required : null),
    });

    this.onSearch('', true);
  }

  items;
  subscription:Subscription;
  onSearch(value , limit = false) {
    if(this.subscription) this.subscription.unsubscribe();
    this.items = [];

    this.subscription = this.apiService.get(
      this.form.value.user_type == UserType.employee ? Endpoints.provider.employees : Endpoints.provider.companies, { limit, name_ar: value }
    ).subscribe(r => {
      this.items = r.data;
    });
  }

  displayFn(item): string {
    return item?.name_ar ||  '';
  }

  optionSelected(ev) {
    this.form.controls['message_to'].setValue(ev.user_id);
  }

  changeFilter(auto) {
    console.log(auto)
    this.form.controls['message_to'].setValue(null);
    this.onSearch('', true);
  }

  
  isSaving;
  save() {
    if(this.form.invalid) return;

    this.isSaving = true;
    this.apiService.post(Endpoints.messages.messages, this.form.value)
    .pipe(
      finalize(( ) => this.isSaving = false)
    ).subscribe(r => {
      this.ref.close(true)
    })
  }
}
