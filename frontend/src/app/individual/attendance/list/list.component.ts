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

  apiFunc =  (opts = {}) => this.apiService.get(Endpoints.employee.attendance, opts);

  settings = {
    columns: {
     /*  employee_name:{
        title: ' الشركة ',
        type: 'string',
        filter: false,
        valuePrepareFunction: (v, r) => r.employee.name_ar ,
      }, */
      date:{
        title: ' دخول ',
        type: 'string',
        filter: false,
        valuePrepareFunction: (v, r) => this.datePipe.transform(r.check_in,'yyyy/MM/dd h:mm a') ,
      },
      check_out:{
        title: ' خروج ',
        type: 'string',
        filter: false,
        valuePrepareFunction: (v, r) => this.datePipe.transform(r.check_out,'yyyy/MM/dd h:mm a') ,
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
    private translateService:TranslateService,
    private themeService:ThemeService,
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
