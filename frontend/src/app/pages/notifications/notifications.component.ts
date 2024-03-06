import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IColumnType } from 'angular2-smart-table';
import { TableComponent } from 'src/shared/components/table/table.component';
import { ApiService } from 'src/shared/services/api.service';
import { Endpoints } from 'src/shared/services/endpoints';
import { ReadNotifcationComponent } from './read-notifcation/read-notifcation.component'

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  providers:[DatePipe]
})
export class NotificationsComponent implements OnInit {

  constructor(
    private apiService:ApiService,
    private datePipe:DatePipe
  ) { }

  ngOnInit(): void {
  }

  @ViewChild('table') table:TableComponent;
  apiFunc =  (opts = {}) => this.apiService.get(Endpoints.misc.notifications, opts);

  settings = {
    columns: {
      heading:{
        title:'العنوان',
        type: IColumnType.Custom,
        filter: false,
        //valuePrepareFunction: (v, r) => `<a href="${r.url}" class="${r.read_at == null?'unread_notfication_row':'' }"   target="_blank"> ${r.data.heading} </a>` ,
        renderComponent: ReadNotifcationComponent,
        onComponentInitFunction: (instance) => {
          instance.parent = this;
        }
      },
      message: {
        title: 'التفاصيل',
        type: IColumnType.Text,
        filter: false,
        valuePrepareFunction: (v,r) => r.data.message
      },
      created_at:{
        title: 'التاريخ',
        type: IColumnType.Text,
        filter: false,
        valuePrepareFunction: (v,r) => this.datePipe.transform( r.created_at, 'yyyy/MM/dd'),
      }
    }
  };


  readNotification(id){
    this.apiService.get(Endpoints.misc.read_notifications+"/"+id).subscribe( r => {
        if(r.url){
            window.location = r.url;
        }
    })
  }

}
