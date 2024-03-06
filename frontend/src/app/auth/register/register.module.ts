import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { StepOneComponent } from './step-one/step-one.component';
import { StepTwoComponent } from './step-two/step-two.component';
import { StepThreeComponent } from './step-three/step-three.component';
import { RegisterComponent } from './register.component';
import { MatCheckboxModule } from '@angular/material/checkbox'
import { SharedModule } from 'src/shared/shared.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RegSuccessComponent } from './reg-success/reg-success.component';

@NgModule({
  declarations: [
    StepOneComponent,
    StepTwoComponent,
    StepThreeComponent,
    RegisterComponent,
    RegSuccessComponent
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    SharedModule,
    MatCheckboxModule,
    MatProgressSpinnerModule
  ]
})
export class RegisterModule { }
