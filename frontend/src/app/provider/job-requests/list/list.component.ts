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
  @ViewChild('nominate') nominate;
  @ViewChild('table') table;
  
  apiFunc =  (opts = {})  => this.apiService.get(Endpoints.provider.jobRequests, {...opts});
  
  settings;

  constructor(
    private matDialog:MatDialog,
    private apiService:ApiService,
    private translateService:TranslateService,
    private datePipe:DatePipe,
    private themeService:ThemeService
  ) { }

  jobs = {};
  ngOnInit(): void {
    this.apiService.get(Endpoints.provider.jobs, {limit:false}).subscribe(r => {
      for(let job of r.data) this.jobs[job.id] = job;

      this.settings = {
        columns: {
          company:{
            title: 'الشركة',
            type: IColumnType.Text,
            filter: true,
            valuePrepareFunction : (v,r) => v.name_ar 
          },
          job_id:{
            title: 'الوظيفة',
            type: IColumnType.Text,
            filter: true,
            valuePrepareFunction : (v,r) => this.jobs[v].job_title 
          },
          created_at:{
            title: 'تاريخ الطلب',
            type: IColumnType.Text,
            valuePrepareFunction: (v,r) => this.datePipe.transform( v, 'yyyy/MM/dd'),
          },
          count:{
            title: 'العدد المطلوب',
            type: IColumnType.Text,
          },
          request_status:{
            title: 'الحالة',
            type: IColumnType.Custom,
            renderComponent: TableStatusComponent,
            onComponentInitFunction: (instance) => {
              instance.statusEnum = this.themeService.settings.JOB_REQEUST_STATUS.enum;
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
    })
  }

  nominateEmplloyees(data) {
    const dialogRef = this.matDialog.open(this.nominate, {
      data:{
        data,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) this.table.reloadTable();
    });
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
    this.apiService.delete(Endpoints.provider.jobRequests + '/' + this.rowToDelete).subscribe( r => {
      this.themeService.openSnackBar('DeleteSuccessMSG', null);
      this.table.reloadTable();
    })
  }


  popApprove(rowData) {
    this.rowToDelete = rowData.id;
    let dialog = this.matDialog.open(DeleteDialogComponent);
    dialog.componentInstance.header = 'إعتماد طلب';
    dialog.componentInstance.body = 'هل تريد إعتماد هذا الطلب؟';
    dialog.componentInstance.confirmBtn = 'إعتماد';
    dialog.afterClosed().subscribe( approve => {
      if(approve) {
        this.apiService.put(Endpoints.provider.jobRequests + '/' + rowData.id + '/approve')
        .subscribe(r => {
          this.themeService.openSnackBar('SavedSuccessfully', null);
          this.table.reloadTable();
        })
      }
    })
  }


}
