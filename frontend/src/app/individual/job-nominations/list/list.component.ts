import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { IColumnType } from 'angular2-smart-table';
import { TableComponent } from 'src/shared/components/table/table.component';
import { ApiService } from 'src/shared/services/api.service';
import { Endpoints } from 'src/shared/services/endpoints';
import { ActionsComponent } from './actions/actions.component';
import { CompanyStatusComponent } from './company-status/company-status.component';

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
  @ViewChild('dialog2') dialog2;

  @ViewChild('table') table:TableComponent;
  
  apiFunc =  (opts = {}) => this.apiService.get(Endpoints.employee.nominations, opts);

  settings = {
    columns: {
      name:{
        title: 'عنوان الوظيفة',
        type: IColumnType.Text,
        filter: true,
        valuePrepareFunction: (v, r) => r.job.job_title ,
      },
      period:{
        title: 'اسم الشركة',
        type: IColumnType.Text,
        valuePrepareFunction: (v, r) => r.company.name_ar ,
      },
      created_at:{
        title: 'تاريخ الاضافة',
        type: IColumnType.Text,
        valuePrepareFunction: (v, r) => this.datePipe.transform(v, 'yyyy/MM/dd') ,
      },
      comp_status:{
        title: 'رد الشركة',
        type: IColumnType.Custom,
        renderComponent: CompanyStatusComponent,
        sort: false,
        filter: false,
        valuePrepareFunction: (v, r) => r.pivot.company_response_status ,
      },
      actions: {
        title: this.translateService.instant('Options'),
        type: IColumnType.Custom,
        renderComponent: ActionsComponent,
        sort: false,
        filter: false,
        onComponentInitFunction: (instance) => {
          instance.parent = this;
        }
      }
    },
  };

  constructor(
    private matDialog:MatDialog,
    private apiService:ApiService,
    private translateService:TranslateService,
    private datePipe:DatePipe
  ) { }

  ngOnInit(): void {  }




  openDialog(data = null, dialog) {
    const dialogRef = this.matDialog.open(dialog, {
      data:{
        data,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.table.reloadTable();
      }
    });
  }


}
