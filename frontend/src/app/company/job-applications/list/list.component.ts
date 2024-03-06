import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { IColumnType } from 'angular2-smart-table';
import { DeleteDialogComponent } from 'src/shared/components/delete-dialog/delete-dialog.component';
import { TableStatusComponent } from 'src/shared/components/table/table-status/table-status.component';
import { TableComponent } from 'src/shared/components/table/table.component';
import { FormMode } from 'src/shared/enums/form-mode';
import { ApiService } from 'src/shared/services/api.service';
import { Endpoints } from 'src/shared/services/endpoints';
import { ThemeService } from 'src/shared/services/theme.service';
import { ActionsComponent } from './actions/actions.component';
import { ApplicantsNumberComponent } from './applicants-number/applicants-number.component';

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
  @ViewChild('table') table:TableComponent;
  
  apiFunc =  (opts = {}) => this.apiService.get(Endpoints.company.emp_requests, opts);

  settings = {
    columns: {
      job:{
        title: 'عنوان الوظيفة',
        filter: true,
        type: IColumnType.Text,
        valuePrepareFunction: (v, r) => v.job_title ,
      },
      count:{
        title: 'العدد المطلوب',
        type: IColumnType.Text,
        filter: false,
      },
      candidates:{
        title: 'عدد المتقدمين',
        type: IColumnType.Text,
        // renderComponent: ApplicantsNumberComponent,
        sort: false,
        filter: false,
        valuePrepareFunction: (v, r) => v.length ,

      },
      created_at:{
        title: 'تاريخ الطلب',
        filter: false,
        type: IColumnType.Text,
        valuePrepareFunction: (v, r) => this.datePipe.transform(v, 'yyyy/MM/dd') ,
      },
      request_status:{
        title: 'الحالة',
        type: IColumnType.Custom,
        renderComponent: TableStatusComponent,
        sort: false,
        filter: false,
        onComponentInitFunction: (instance) => instance.statusEnum = this.themeService.settings.JOB_REQEUST_STATUS.enum
      },
      actions: {
        title: this.translateService.instant('Options'),
        type: IColumnType.Custom,
        renderComponent: ActionsComponent,
        sort: false,
        filter: false,
        onComponentInitFunction: (instance) => {
          console.log(instance);
          instance.parent = this;
        }
      }
    },
  };

  constructor(
    private matDialog:MatDialog,
    private apiService:ApiService,
    private datePipe:DatePipe,
    private translateService:TranslateService,
    private themeService:ThemeService
  ) { }

  jobs;
  ngOnInit(): void {
    this.apiService.get(Endpoints.employee.jobs).subscribe(r => this.jobs = r.jobs );
  }


  rowToDelete;
  popDelete(rowData) {
    this.rowToDelete = rowData.id;
    this.matDialog.open(DeleteDialogComponent, {
      data:{
        parent:this
      },
    });
  }

  delete() {
    console.log('deleting user')
    this.apiService.delete(Endpoints.company.emp_requests + '/' + this.rowToDelete).subscribe( r => {
      this.themeService.openSnackBar('DeleteSuccessMSG', null);
      this.table.reloadTable();
    })
  }
  

  openDialog(data = null, mode = FormMode.Create) {
    const dialogRef = this.matDialog.open(this.dialog, {
      data:{
        data,
        mode,
        jobs:this.jobs
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.table.reloadTable();
    });
  }

}
