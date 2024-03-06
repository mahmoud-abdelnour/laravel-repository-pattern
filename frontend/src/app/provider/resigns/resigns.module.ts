import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResignsRoutingModule } from './resigns-routing.module';
import { ResignsComponent } from './resigns.component';
import { ListComponent } from './list/list.component';
import { SharedModule } from 'src/shared/shared.module';
import { ActionsComponent } from './actions/actions.component';


@NgModule({
  declarations: [
    ResignsComponent,
    ListComponent,
    ActionsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ResignsRoutingModule
  ]
})
export class ResignsModule { }
