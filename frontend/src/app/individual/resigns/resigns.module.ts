import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResignsRoutingModule } from './resigns-routing.module';
import { ResignsComponent } from './resigns.component';
import { SharedModule } from 'src/shared/shared.module';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';


@NgModule({
  declarations: [
    ResignsComponent,
    ListComponent,
    CreateComponent
  ],
  imports: [
    CommonModule,
    ResignsRoutingModule,
    SharedModule
  ]
})
export class ResignsModule { }
