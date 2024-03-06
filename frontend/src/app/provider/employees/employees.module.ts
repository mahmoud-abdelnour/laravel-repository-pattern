import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesRoutingModule } from './employees-routing.module';
import { ListComponent } from './list/list.component';
import { SharedModule } from 'src/shared/shared.module';
import { ActionsComponent } from './list/actions/actions.component';
import { SuggestCoursesComponent } from './suggest-courses/suggest-courses.component';
import { EmployeesComponent } from './employees/employees.component';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedProviderModule } from '../shared-provider/shared-provider.module';


@NgModule({
  declarations: [
    ListComponent,
    ActionsComponent,
    SuggestCoursesComponent,
    EmployeesComponent
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    SharedModule,
    MatTabsModule,
    SharedProviderModule
  ]
})
export class EmployeesModule { }
