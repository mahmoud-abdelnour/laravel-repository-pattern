import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { SharedModule } from 'src/shared/shared.module';
import { ActionsComponent } from './list/actions/actions.component';
//import { SharedProviderModule } from '../../provider/shared-provider/shared-provider.module';


@NgModule({
  declarations: [
    ListComponent,
    CreateComponent,
    ActionsComponent
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    SharedModule
    //SharedProviderModule
  ]
})
export class TasksModule { }
