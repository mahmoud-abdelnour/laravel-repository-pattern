import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompaniesRoutingModule } from './companies-routing.module';
import { ListComponent } from './list/list.component';
import { ActionsComponent } from './list/actions/actions.component';
import { SharedModule } from 'src/shared/shared.module';
import { CompaniesComponent } from './companies/companies.component';
import { MatTabsModule } from '@angular/material/tabs';
import { CompanyDialogComponent } from './company-dialog/company-dialog.component';
import { PaymentActionsComponent } from './company-dialog/payment-actions/payment-actions.component';
import { CreateComponent } from './create/create.component';
import { AssignCandidateComponent } from './assign-candidate/assign-candidate.component';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    ListComponent,
    ActionsComponent,
    CompaniesComponent,
    CompanyDialogComponent,
    PaymentActionsComponent,
    CreateComponent,
    AssignCandidateComponent,
  ],
  imports: [
    CommonModule,
    CompaniesRoutingModule,
    SharedModule,
    MatTabsModule,
    MatSelectModule,

  ]
})
export class CompaniesModule { }
