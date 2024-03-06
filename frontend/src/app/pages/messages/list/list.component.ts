import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IColumnType } from 'angular2-smart-table';
import { FormMode } from 'src/shared/enums/form-mode';
import { ApiService } from 'src/shared/services/api.service';
import { Endpoints } from 'src/shared/services/endpoints';
import { ThemeService } from 'src/shared/services/theme.service';
import { UserService } from 'src/shared/services/user.service';
import { ActionsComponent } from './actions/actions.component';
import { TranslateService } from '@ngx-translate/core';
import { TableComponent } from 'src/shared/components/table/table.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers:[
    DatePipe
  ]
})
export class ListComponent implements OnInit {
  @ViewChild('viewMsg') viewMsg;
  @ViewChild('dialog') dialog;
  @ViewChild('table1') table1:TableComponent;
  @ViewChild('table2') table2:TableComponent;

  apiFuncSend =  (opts = {}) => this.apiService.get(Endpoints.messages.sent, opts);
  apiFuncInbox =  (opts = {}) => this.apiService.get(Endpoints.messages.inbox, opts);

  settings_inbox = {
    columns: {
      message_title : {
        title: 'عنوان الرسالة',
        type: IColumnType.Text,
        filter: false,
      },
      message_content : {
        title: 'محتوى الرسالة',
        type: IColumnType.Text,
        filter: false,
      },
      created_at : {
        title: 'تاريخ الإرسال',
        type: IColumnType.Text,
        valuePrepareFunction: (v, r) => this.datePipe.transform(v, 'yyyy/MM/dd') ,
        filter: false,
      },
      actions : {
        title: this.translateService.instant('Options'),
        type: IColumnType.Custom,
        classContent: 'options-cell',
        classHeader: 'options-cell',
        renderComponent: ActionsComponent,
        sort: false,
        filter: false,
        onComponentInitFunction: (instance) => {
          instance.parent = this;
          instance.view_type = 'inbox';
        }
      }
    },
  };


settings_sent = {
    columns: {
      message_title : {
        title: 'عنوان الرسالة',
        type: IColumnType.Text,
        filter: false,
      },
     /*  message_to : {
        title: 'الى',
        type: IColumnType.Text,
        filter: false,
        valuePrepareFunction: (v, r) =>{ 
            if(r.to_type == 'privder'){
              "مدير النظام" 
            }else{
              r.receiver.name;
            } 
        },
      }, */
      message_content : {
        title: 'محتوى الرسالة',
        type: IColumnType.Text,
        filter: false,
      },
      created_at : {
        title: 'تاريخ الإرسال',
        type: IColumnType.Text,
        valuePrepareFunction: (v, r) => this.datePipe.transform(v, 'yyyy/MM/dd') ,
        filter: false,
      },
      actions : {
        title: this.translateService.instant('Options'),
        type: IColumnType.Custom,
        classContent: 'options-cell',
        classHeader: 'options-cell',
        renderComponent: ActionsComponent,
        sort: false,
        filter: false,
        onComponentInitFunction: (instance) => {
          instance.parent = this;
          instance.view_type = 'sent';
        }
      }
    },
  };
  
  constructor(
    private  matDialog:MatDialog,
    public   themeService:ThemeService,
    public   userService:UserService,
    private  apiService:ApiService,
    private  datePipe:DatePipe,
    private  translateService:TranslateService
  ) { }

  ngOnInit(): void {
  }

  openDialog(dialog, data = null, view_type = '' ) {
    const dialogRef = this.matDialog.open(dialog, {
      data:{
        data,
        view_type
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.table1.reloadTable();
        this.table2.reloadTable();
      }
    });
  }

}
