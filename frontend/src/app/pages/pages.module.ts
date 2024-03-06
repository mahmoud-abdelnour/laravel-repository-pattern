import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { SharedModule } from 'src/shared/shared.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HomeComponent } from './home/home.component';
import { MatMenuModule } from '@angular/material/menu';
import { ProviderProfileComponent } from './provider-profile/provider-profile.component';
import { NgxEchartsModule } from 'ngx-echarts';


@NgModule({
  declarations: [
    LayoutComponent,
    HomeComponent,
    ProviderProfileComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    MatSidenavModule,
    MatListModule,
    MatTooltipModule,
    MatMenuModule,
    NgxEchartsModule.forChild(),
  ]
})
export class PagesModule { }
