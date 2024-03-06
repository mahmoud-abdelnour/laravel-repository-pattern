import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { SharedModule } from 'src/shared/shared.module';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { ActionsComponent } from './list/actions/actions.component';
// import { PermissionsComponent } from './permissions/permissions.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SharedProviderModule } from '../shared-provider/shared-provider.module';
import { RolesChipsComponent } from './list/roles-chips/roles-chips.component';
import { MatChipsModule } from '@angular/material/chips';


@NgModule({
  declarations: [
    ListComponent,
    CreateComponent,
    ActionsComponent,
    RolesChipsComponent,
    // PermissionsComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    MatTabsModule,
    MatListModule,
    MatExpansionModule,
    MatCheckboxModule,
    SharedProviderModule,
    MatChipsModule
  ]
})
export class UsersModule { }
