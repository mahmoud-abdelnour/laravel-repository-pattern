import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';

import { SharedModule } from 'src/shared/shared.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { ProviderRoutingModule } from './provider-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProviderRoutingModule,
    SharedModule,
    MatSidenavModule,
    MatListModule,
    MatTooltipModule,
    MatMenuModule,
    NgxEchartsModule.forChild()
  ]
})
export class ProviderModule { }
