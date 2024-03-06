import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobRequestsRoutingModule } from './job-requests-routing.module';
import { ListComponent } from './list/list.component';
import { ActionsComponent } from './list/actions/actions.component';
import { SharedModule } from 'src/shared/shared.module';
import { RequestComponent } from './request/request.component';
import { RequestEmpActionsComponent } from './request/request-emp-actions/request-emp-actions.component';
// import { EmployeeDataComponent } from './employee-data/employee-data.component';
import { MatTabsModule } from '@angular/material/tabs';
import { RequestStatusComponent } from './request/request-status/request-status.component';
import { NominateEmployeesComponent } from './nominate-employees/nominate-employees.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatListModule } from '@angular/material/list';
import { AcceptRejectNominantComponent } from './request/accept-reject-nominant/accept-reject-nominant.component';
import { SharedProviderModule } from '../shared-provider/shared-provider.module';

@NgModule({
  declarations: [
    ListComponent,
    ActionsComponent,
    RequestComponent,
    RequestEmpActionsComponent,
    // EmployeeDataComponent,
    RequestStatusComponent,
    NominateEmployeesComponent,
    AcceptRejectNominantComponent,
    
  ],
  imports: [
    CommonModule,
    JobRequestsRoutingModule,
    SharedModule,
    MatTabsModule,
    MatAutocompleteModule,
    MatListModule,
    SharedProviderModule
  ]
})
export class JobRequestsModule { }
