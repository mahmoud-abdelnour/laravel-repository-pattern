import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { IColumnType } from 'angular2-smart-table';
import { DeleteDialogComponent } from 'src/shared/components/delete-dialog/delete-dialog.component';
import { TableStatusComponent } from 'src/shared/components/table/table-status/table-status.component';
import { FormMode } from 'src/shared/enums/form-mode';
import { ApiService } from 'src/shared/services/api.service';
import { Endpoints } from 'src/shared/services/endpoints';
import { ThemeService } from 'src/shared/services/theme.service';
import { ActionsComponent } from './actions/actions.component';

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
  @ViewChild('assignDialog') assignDialog;
  @ViewChild('table') table;
  
  apiFunc =  (opts = {})  => this.apiService.get(Endpoints.provider.jobs,opts);
  
  settings = {
    columns: {
      job_title:{
        title: 'عنوان الوظيفة',
        type: IColumnType.Text,
        filter: true,
      },
      employees_count:{
        title: ' عدد الموظفين ',
        type: IColumnType.Text,
        filter: true,
      },
      created_at:{
        title: 'تاريخ الاضافة',
        type: IColumnType.Text,
        valuePrepareFunction: (v, r) => this.datePipe.transform(v, 'yyyy/MM/dd') ,
      },
      status:{
        title: 'الحالة',
        type: IColumnType.Custom,
        renderComponent: TableStatusComponent,
        onComponentInitFunction: (instance) => {
          instance.statusEnum = this.themeService.settings.JOB_STATUS.enum;
        },
      },
      actions: {
        title: this.translateService.instant('Options'),
        type: IColumnType.Custom,
        renderComponent: ActionsComponent,
        sort: false,
        filter: false,
        onComponentInitFunction: (instance) => instance.parent = this
      }
    },
  };

  constructor(
    private matDialog:MatDialog,
    private apiService:ApiService,
    private translateService:TranslateService,
    private datePipe:DatePipe,
    private themeService:ThemeService
  ) { }

  ngOnInit(): void {
  }



  openDialog(mode = FormMode.Create, data = null) {
    const dialogRef = this.matDialog.open(this.dialog, {
      data:{
        data,
        mode
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) this.table.reloadTable();
    });
  }



  rowToDelete;
  popDelete(rowData) {
    this.rowToDelete = rowData.id;
    let dialog = this.matDialog.open(DeleteDialogComponent, {
      data:{
        parent:this
      },
    });
    dialog.componentInstance.header = 'DeleteJobTitle';
    dialog.componentInstance.body = 'DeleteJobMSG';
  }

  delete() {
    this.apiService.delete(Endpoints.provider.jobs + '/' + this.rowToDelete).subscribe( r => {
      this.themeService.openSnackBar('DeleteSuccessMSG', null);
      this.table.reloadTable();
    })
  }


  assignTask(data) {
    const dialogRef = this.matDialog.open(this.assignDialog, {
      data:{
        data,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) this.table.reloadTable();
    });
  }


}
