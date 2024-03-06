import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserType } from 'src/shared/enums/user-type';
import { onlyInteger } from 'src/shared/functions/negative-number';



@Component({
  selector: 'app-step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.scss']
})
export class StepOneComponent implements OnInit {
  @Input('form') form:FormGroup;
  @Input('subscription') subscription;

  UserType = UserType;

  @Input('tabs') tabs;
  constructor(
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  // changeType(val) {
  //   this.form.controls['user_type'].setValue(val);
  //   if(val == UserType.company) {
  //     this.form.addControl('commercial_record', new FormControl(null, [Validators.required, onlyInteger()]));
  //     this.form.removeControl('national_id');
  //   } else {
  //     this.form.addControl('national_id', new FormControl(null, [Validators.required, Validators.minLength(11), Validators.maxLength(11), onlyInteger()]));
  //     this.form.removeControl('commercial_record');
  //   } 
  //   this.form.updateValueAndValidity();
  // }


  save() {
    if(this.form.invalid) return;
    this.tabs.activeTab = 2;
  }


  cancel() {
    for( let sub of this.subscription) if(sub) sub.unsubscribe();
    this.router.navigate(['/auth/login'])
  }

}


// "name_ar": "string",
// "name_en": "string",
// "email": "string",
// "mobile": "string",
// "national_id": "string",
// "qualification": "string",
// "gender": "string",
// "martial_status": "string",
// "bank_name": "string",
// "bank_ipan": "string",
// "qualification_file": "string",
// "national_address_file": "string",
// "bank_ipan_file": "string",
// "national_id_file": "string",
// "secret_approvement_file": "string",
// "registered_in_remote_work_platform": true
