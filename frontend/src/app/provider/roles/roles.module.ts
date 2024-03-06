import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolesRoutingModule } from './roles-routing.module';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { ActionsComponent } from './list/actions/actions.component';
import { SharedModule } from 'src/shared/shared.module';
import { SharedProviderModule } from '../shared-provider/shared-provider.module';


@NgModule({
  declarations: [
    ListComponent,
    CreateComponent,
    ActionsComponent
  ],
  imports: [
    CommonModule,
    RolesRoutingModule,
    SharedModule,
    SharedProviderModule
  ]
})
export class RolesModule { }
