import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { IColumnType } from 'angular2-smart-table';
import { TableComponent } from 'src/shared/components/table/table.component';
import { FormMode } from 'src/shared/enums/form-mode';
import { ApiService } from 'src/shared/services/api.service';
import { Endpoints } from 'src/shared/services/endpoints';
import { ActionsComponent } from './actions/actions.component';
import { DeleteDialogComponent } from 'src/shared/components/delete-dialog/delete-dialog.component';
import { ThemeService } from 'src/shared/services/theme.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers:[DatePipe]
})
export class ListComponent implements OnInit {
  FormMode = FormMode;
  
  @ViewChild('dialog') dialog;
  @ViewChild('table') table:TableComponent;
  apiFunc =  (opts = {}) => this.apiService.get(Endpoints.company.emp_task, opts);

  settings = {
    columns: {
      employee:{
        title: 'الموظف',
        type: IColumnType.Text,
        filter: true,
        valuePrepareFunction : (v,r) => r.employee.name_ar 
      },
      task_title:{
        title: 'عنوان المهمة',
        type: IColumnType.Text,
        filter: true,
        valuePrepareFunction : (v,r) => r.task.task_title 
      },
      task_period:{
        title: 'مدة المهمة',
        type: IColumnType.Text,
        valuePrepareFunction : (v,r) => r.task.task_period +" ساعة",
      },
      created_at:{
        title: 'تاريخ الاسناد',
        type: IColumnType.Text,
        valuePrepareFunction: (v,r) => this.datePipe.transform( r.created_at, 'yyyy/MM/dd'),
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
   /*    due_date:{
        title: 'تاريخ الإستحقاق',
        type: IColumnType.Text,
        valuePrepareFunction: (v,r) => this.datePipe.transform( r.due_date, 'yyyy/MM/dd'),
      }, */
      actions: {
        title: this.translateService.instant('Options'),
        type: IColumnType.Custom,
        renderComponent: ActionsComponent,
        sort: false,
        filter: false,
        onComponentInitFunction: (instance, data) => {
          instance.parent = this;
          // this.openDialog(data.rowData)
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

  employees;
  ngOnInit(): void {
    this.apiService.get(Endpoints.company.list_employees, {limit:false}).subscribe( employees => {
      console.log(employees);
      this.employees = employees.data;
    });

  }

  

  openDialog(mode = FormMode.Create, data = null) {
    const dialogRef = this.matDialog.open(this.dialog, {
      data:{
        data,
        employees:this.employees,
        mode
      }
    });

    dialogRef.afterClosed().subscribe(result => {
     if(result) this.table.reloadTable()
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
      this.table.reloadTable();
    })
  }
}
