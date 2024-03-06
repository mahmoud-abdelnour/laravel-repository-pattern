import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesRoutingModule } from './employees-routing.module';
import { ListComponent } from './list/list.component';
import { SharedModule } from 'src/shared/shared.module';
import { ActionsComponent } from './list/actions/actions.component';
import { CompanySharedModule } from '../company-shared/company-shared.module';
import { ResignDialogComponent } from './resign-dialog/resign-dialog.component';


@NgModule({
  declarations: [
    ListComponent,
    ActionsComponent,
    ResignDialogComponent,
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    SharedModule,
    CompanySharedModule
  ]
})
export class EmployeesModule { }