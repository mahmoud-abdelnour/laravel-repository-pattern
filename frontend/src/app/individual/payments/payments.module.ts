import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentsRoutingModule } from './payments-routing.module';
import { ListComponent } from './list/list.component';
import { SharedModule } from 'src/shared/shared.module';
import { ActionsComponent } from './list/actions/actions.component';
import { CreateComponent } from './create/create.component';
import { MatRadioModule } from '@angular/material/radio';


@NgModule({
  declarations: [
    ListComponent,
    ActionsComponent,
    CreateComponent
  ],
  imports: [
    CommonModule,
    PaymentsRoutingModule,
    SharedModule,
    MatRadioModule
  ]
})
export class PaymentsModule { }
