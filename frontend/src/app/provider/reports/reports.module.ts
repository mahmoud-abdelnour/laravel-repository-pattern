import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';

import { SharedModule } from 'src/shared/shared.module';
import { MatListModule } from '@angular/material/list';
import { NgxEchartsModule } from 'ngx-echarts';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CustomComponent } from './custom/custom.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    ReportsComponent,
    CustomComponent
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    CommonModule,
    SharedModule,
    MatListModule,
    NgxEchartsModule.forChild(),
    MatDatepickerModule,
    MatNativeDateModule,

    MatRadioModule,
    MatAutocompleteModule,
    MatSelectModule,
   
    MatInputModule
  ],
  exports:[
    CustomComponent
  ]
})
export class ReportsModule { }
