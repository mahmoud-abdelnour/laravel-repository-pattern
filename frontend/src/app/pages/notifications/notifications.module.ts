import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationsRoutingModule } from './notifications-routing.module';
import { NotificationsComponent } from './notifications.component';
import { SharedModule } from 'src/shared/shared.module';
import { ReadNotifcationComponent } from './read-notifcation/read-notifcation.component';


@NgModule({
  declarations: [
    NotificationsComponent,
    ReadNotifcationComponent
  ],
  imports: [
    CommonModule,
    NotificationsRoutingModule,
    SharedModule
  ]
})
export class NotificationsModule { }
