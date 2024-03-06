import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobNominationsRoutingModule } from './job-nominations-routing.module';
import { ListComponent } from './list/list.component';
import { SharedModule } from 'src/shared/shared.module';
import { JobPreviewComponent } from './job-preview/job-preview.component';
import { ActionsComponent } from './list/actions/actions.component';
import { CompanyStatusComponent } from './list/company-status/company-status.component';
import { MatChipsModule } from '@angular/material/chips';
import { ApplyInsuranceComponent } from './apply-insurance/apply-insurance.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    ListComponent,
    JobPreviewComponent,
    ActionsComponent,
    CompanyStatusComponent,
    ApplyInsuranceComponent
  ],
  imports: [
    CommonModule,
    JobNominationsRoutingModule,
    SharedModule,
    MatChipsModule,
    MatProgressSpinnerModule
  ]
})
export class JobNominationsModule { }
