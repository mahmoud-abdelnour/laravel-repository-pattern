import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForgetPasswordRoutingModule } from './forget-password-routing.module';
import { SharedModule } from 'src/shared/shared.module';
import { MatTabsModule } from '@angular/material/tabs';
import { ForgetPasswordComponent } from './forget-password.component';


@NgModule({
  declarations: [
    ForgetPasswordComponent
  ],
  imports: [
    CommonModule,
    ForgetPasswordRoutingModule,
    SharedModule,
    MatTabsModule,

  ]
})
export class ForgetPasswordModule { }
