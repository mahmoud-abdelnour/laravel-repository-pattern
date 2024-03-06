import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { ListComponent } from './list/list.component';
import { ActionsComponent } from './list/actions/actions.component';
import { CreateComponent } from './create/create.component';
import { SharedModule } from 'src/shared/shared.module';


@NgModule({
  declarations: [
    ListComponent,
    ActionsComponent,
    CreateComponent
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    SharedModule
  ]
})
export class TasksModule { }
