import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResignsRoutingModule } from './resigns-routing.module';
import { ResignsComponent } from './resigns.component';
import { ListComponent } from './list/list.component';
import { SharedModule } from 'src/shared/shared.module';


@NgModule({
  declarations: [
    ResignsComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    ResignsRoutingModule,
    SharedModule

  ]
})
export class ResignsModule { }
