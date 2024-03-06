import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { IColumnType } from 'angular2-smart-table';
import { ApiService } from 'src/shared/services/api.service';
import { Endpoints } from 'src/shared/services/endpoints';
import { ActionsComponent } from './actions/actions.component';
import { DeleteDialogComponent } from 'src/shared/components/delete-dialog/delete-dialog.component';
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

  apiFunc =  (opts = {}) => this.apiService.get(Endpoints.employee.tasks, opts);

  settings = {
    columns: {
      task_title:{
        title: 'عنوان المهمة',
        type: 'string',
        filter: true,
        valuePrepareFunction: (v, r) => r.task.task_title ,
      },
      permissions:{
        title: 'مدة المهمة',
        type: 'string',
        valuePrepareFunction: (v, r) => r.task.task_period+" ساعة",
      },
      date:{
        title: 'تاريخ الاسناد',
        type: 'string',
        valuePrepareFunction: (v, r) => this.datePipe.transform(r.created_at, 'yyyy/MM/dd h:mm a') ,
      },
      started_at:{
        title: 'تاريخ البدء',
        type: 'string',
        valuePrepareFunction: (v, r) => this.datePipe.transform(r.started_at, 'yyyy/MM/dd h:mm a') ,
      },
      finished_at:{
        title: 'تاريخ الانتهاء',
        type: 'string',
        valuePrepareFunction: (v, r) => this.datePipe.transform(r.finished_at, 'yyyy/MM/dd h:mm a') ,
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
    private translateService:TranslateService,
    private datePipe:DatePipe,
    private themeService:ThemeService
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


  
  rowToDelete;
  popDelete(rowData) {
    this.rowToDelete = rowData.id;
    let dialog = this.matDialog.open(DeleteDialogComponent, {
      data:{
        parent:this
      },
    });
    dialog.componentInstance.header = 'DeleteTaskTitle';
    dialog.componentInstance.body = 'DeleteTaskMSG';
  }

  delete() {
    this.apiService.delete(Endpoints.company.delete_task + '/' + this.rowToDelete).subscribe( r => {
      this.themeService.openSnackBar('DeleteSuccessMSG', null);
///      this.updateTables();
    })
  }
}
