import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskDialogComponent } from './task-dialog/task-dialog.component';
import { SharedModule } from 'src/shared/shared.module';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';



@NgModule({
  declarations: [
    TaskDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatNativeDateModule,
    MatDatepickerModule
  ],
  exports:[
    TaskDialogComponent
  ]
})
export class CompanySharedModule { }
