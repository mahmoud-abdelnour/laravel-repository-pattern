import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttendanceRoutingModule } from './attendance-routing.module';
import { AttendanceComponent } from './attendance.component';
import { ListComponent } from './list/list.component';
import { SharedModule } from 'src/shared/shared.module';
import { ActionComponent } from './action/action.component';


@NgModule({
  declarations: [
    AttendanceComponent,
    ListComponent,
    ActionComponent
  ],
  imports: [
    CommonModule,
    AttendanceRoutingModule,
    SharedModule
  ]
})
export class AttendanceModule { }
