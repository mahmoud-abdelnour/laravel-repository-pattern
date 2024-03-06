import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeDataComponent } from './employee-data/employee-data.component';
import { SharedModule } from 'src/shared/shared.module';
import { MatTabsModule } from '@angular/material/tabs';
import { PaymentListComponent } from './payment-list/payment-list.component';
import { PaymentActionsComponent } from './payment-list/payment-actions/payment-actions.component';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { PermissionsComponent } from './permissions/permissions.component';


@NgModule({
  declarations: [
    EmployeeDataComponent,
    PaymentListComponent,
    PaymentActionsComponent,
    PermissionsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatTabsModule,
    MatListModule,
    MatExpansionModule,
    MatCheckboxModule
  ],
  exports:[
    EmployeeDataComponent,
    PermissionsComponent
  ]
})
export class SharedProviderModule { }
