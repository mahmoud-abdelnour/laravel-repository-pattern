import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CandidatesRoutingModule } from './candidates-routing.module';
import { ListComponent } from './list/list.component';
import { ActionsComponent } from './list/actions/actions.component';
import { SharedModule } from 'src/shared/shared.module';
import { CandidatesComponent } from './candidates.component';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedProviderModule } from '../shared-provider/shared-provider.module';
import { CreateComponent } from './create/create.component';


@NgModule({
  declarations: [
    ListComponent,
    ActionsComponent,
    CandidatesComponent,
    CreateComponent
  ],
  imports: [
    CommonModule,
    CandidatesRoutingModule,
    SharedModule,
    MatTabsModule,
    SharedProviderModule
  ]
})
export class CandidatesModule { }
