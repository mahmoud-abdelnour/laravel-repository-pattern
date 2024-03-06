import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';
import { CustomComponent } from '../../provider/reports/custom/custom.component';
import { ReportsModule  as ReportsModule2}  from '../../provider/reports/reports.module';
import { SharedModule } from 'src/shared/shared.module';


@NgModule({
  declarations: [
    ReportsComponent,
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    ReportsModule2,
    SharedModule,

  ],

})
export class ReportsModule { }
