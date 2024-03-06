import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { ListComponent } from './list/list.component';
// import { CreateComponent } from './create/create.component';
import { SharedModule } from 'src/shared/shared.module';
import { ActionsComponent } from './list/actions/actions.component';

import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CompanySharedModule } from '../company-shared/company-shared.module';

@NgModule({
  declarations: [
    ListComponent,
    // CreateComponent,
    ActionsComponent
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    SharedModule,
    MatNativeDateModule,
    MatDatepickerModule,
    CompanySharedModule
  ]
})
export class TasksModule { }
