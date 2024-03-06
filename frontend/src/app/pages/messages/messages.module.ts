import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessagesRoutingModule } from './messages-routing.module';
import { SharedModule } from 'src/shared/shared.module';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ViewMsgComponent } from './view-msg/view-msg.component';
import { ActionsComponent } from './list/actions/actions.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
  declarations: [
    ListComponent,
    CreateComponent,
    ViewMsgComponent,
    ActionsComponent
  ],
  imports: [
    CommonModule,
    MessagesRoutingModule,
    SharedModule,
    MatTabsModule,
    MatRadioModule,
    MatAutocompleteModule
  ]
})
export class MessagesModule { }
