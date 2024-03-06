import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { IColumnType } from 'angular2-smart-table';
import { ApiService } from 'src/shared/services/api.service';
import { Endpoints } from 'src/shared/services/endpoints';
/* import { ActionsComponent } from './actions/actions.component'; */
import { TableStatusComponent } from 'src/shared/components/table/table-status/table-status.component';
import { ThemeService } from 'src/shared/services/theme.service';
import { UserService } from 'src/shared/services/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers:[
    DatePipe
  ]
})
export class ListComponent implements OnInit {
  @ViewChild('dialog') dialog;
  @ViewChild('table') table;

  apiFunc =  (opts = {}) => this.apiService.get(Endpoints.employee.resigns, opts);

  settings = {
    columns: {
      task_title:{
        title: ' الوظيفة ',
        type: 'string',
        filter: false,
        valuePrepareFunction: (v, r) => r.employee.job.job_title ,
      },
     
      date:{
        title: 'تاريخ الاسناد',
        type: 'string',
        filter: false,
        valuePrepareFunction: (v, r) => this.datePipe.transform(r.created_at, 'yyyy/MM/dd') ,
      },
      status:{
        title: 'الحالة',
        filter: false,
        type: IColumnType.Custom,
        renderComponent: TableStatusComponent,
        onComponentInitFunction: (instance) => {
          instance.statusEnum = this.themeService.settings.RESIGN_STATUS.enum;
        },
      },
      /*actions: {
        title: this.translateService.instant('Options'),
        type: IColumnType.Custom,
        renderComponent: ActionsComponent,
        sort: false,
        filter: false,
        onComponentInitFunction: (instance) => {
          console.log(instance);
          instance.parent = this;
        }
      } */
    },
  };
  

  constructor(
    private matDialog:MatDialog,
    private apiService:ApiService,
    private themeService:ThemeService,
    public userService:UserService,
    private translateService:TranslateService,
    private datePipe:DatePipe
  ) { }

  ngOnInit(): void {
  }

  

  openDialog(data = null) {
    const dialogRef = this.matDialog.open(this.dialog, {
      data:{
        data,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
