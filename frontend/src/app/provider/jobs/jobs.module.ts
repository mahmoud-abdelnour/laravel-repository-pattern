import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobsRoutingModule } from './jobs-routing.module';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { ActionsComponent } from './list/actions/actions.component';
import { SharedModule } from 'src/shared/shared.module';
import { AssignTaskComponent } from './assign-task/assign-task.component';
import { MatListModule } from '@angular/material/list';


@NgModule({
  declarations: [
    ListComponent,
    CreateComponent,
    ActionsComponent,
    AssignTaskComponent
  ],
  imports: [
    CommonModule,
    JobsRoutingModule,
    SharedModule,
    MatListModule
  ]
})
export class JobsModule { }
