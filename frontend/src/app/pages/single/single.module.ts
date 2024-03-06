import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingleRoutingModule } from './single-routing.module';
import { SingleComponent } from './single.component';

import { SharedModule } from 'src/shared/shared.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRadioModule } from '@angular/material/radio';
import { MatAutocompleteModule } from '@angular/material/autocomplete';



@NgModule({
  declarations: [
    SingleComponent
  ],
  imports: [
    CommonModule,
    SingleRoutingModule,

    SharedModule,
    MatTabsModule,
    MatRadioModule,
    MatAutocompleteModule
  ]
})
export class SingleModule { }
