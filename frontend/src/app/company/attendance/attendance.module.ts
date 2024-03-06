import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttendanceRoutingModule } from './attendance-routing.module';
import { AttendanceComponent } from './attendance.component';
import { ListComponent } from './list/list.component';
import { SharedModule } from 'src/shared/shared.module';


@NgModule({
  declarations: [
    AttendanceComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    AttendanceRoutingModule,
    SharedModule
  ]
})
export class AttendanceModule { }
