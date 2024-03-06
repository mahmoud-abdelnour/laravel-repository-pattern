import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobApplicationsRoutingModule } from './job-applications-routing.module';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { SharedModule } from 'src/shared/shared.module';
import { ActionsComponent } from './list/actions/actions.component';
import { MatChipsModule } from '@angular/material/chips';
import { ApplicantsNumberComponent } from './list/applicants-number/applicants-number.component';
import { ApplicantsListComponent } from './applicants-list/applicants-list.component';
import { ApplicantActionsComponent } from './applicants-list/applicant-actions/applicant-actions.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    ListComponent,
    CreateComponent,
    ActionsComponent,
    ApplicantsNumberComponent,
    ApplicantsListComponent,
    ApplicantActionsComponent,
  ],
  imports: [
    CommonModule,
    JobApplicationsRoutingModule,
    SharedModule,
    MatChipsModule,
    MatRadioModule,
    MatProgressSpinnerModule
  ]
})
export class JobApplicationsModule { }
