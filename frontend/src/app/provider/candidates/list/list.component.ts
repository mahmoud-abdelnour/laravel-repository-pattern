import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
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
import { EmployeeDataComponent } from '../../shared-provider/employee-data/employee-data.component';
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
  FormMode = FormMode;
  
  @ViewChild('table') table:TableComponent;

  @Input('lists') lists;
  @Input('jobs') jobs = {};
  @Input('apiFunc') apiFunc;
  @Input('paginationId') paginationId;

  settings;
  
  constructor(
    private matDialog:MatDialog,
    private apiService:ApiService,
    private datePipe:DatePipe,
    private translateService:TranslateService,
    private themeService:ThemeService
  ) { }

  ngOnInit(): void {
    this.settings = {
      columns: {
        name_ar:{
          title: 'المرشح',
          type: IColumnType.Text,
          filter: true,
          filterFunction(obj?: any, search?: string): boolean {
            return true;
          },
          valuePrepareFunction : (v,r) => r.name_ar 
        },
        job_id:{
          title: 'الوظيفة',
          type: IColumnType.Text,
          filter: true,
          filterFunction(obj?: any, search?: string): boolean {
            return true;
          },
          valuePrepareFunction : (v,r) => this.jobs[v]?.job_title 
        },
        created_at:{
          title: 'تاريخ الإنضمام',
          filter: false,
          type: IColumnType.Text,
          valuePrepareFunction: (v,r) => this.datePipe.transform( v, 'yyyy/MM/dd'),
        },
        status:{
          title: 'الحالة',
          type: IColumnType.Custom,
          filter:false,
          renderComponent: TableStatusComponent,
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
  }

  rowToDelete;
  popDelete(rowData) {
    this.rowToDelete = rowData.id;
    let dialog = this.matDialog.open(DeleteDialogComponent, {
      data:{
        parent:this
      },
    });
    dialog.componentInstance.header = 'DeleteCandidateTitle';
    dialog.componentInstance.body = 'DeleteCandidateMSG';
  }

  delete() {
    this.apiService.delete(Endpoints.provider.employees + '/' + this.rowToDelete).subscribe( r => {
      this.themeService.openSnackBar('DeleteSuccessMSG', null);
      this.updateTables();
    })
  }


  banCandidate(rowData) {
    let dialog = this.matDialog.open(DeleteDialogComponent, {
      data:{
        header:'sddsds'
      },
    });
    dialog.componentInstance.header = 'BanCandidateTitle';
    dialog.componentInstance.body = 'BanCandidateMSG';
    dialog.componentInstance.confirmBtn = 'BanBtn';
    dialog.afterClosed().subscribe( ban => {
      if(ban) {
        this.apiService.put(Endpoints.provider.employees + '/' + rowData.id + '/ban').subscribe(r => {
          this.themeService.openSnackBar('BanSuccessMSG', null);
          this.updateTables();
        })
      }
    })
  }

  admitCandidate(rowData) {
    let dialog = this.matDialog.open(DeleteDialogComponent);
    dialog.componentInstance.header = 'admitCandidateTitle';
    dialog.componentInstance.body = 'admitCandidateMSG';
    dialog.componentInstance.confirmBtn = 'admitBtn';
    dialog.afterClosed().subscribe( admit => {
      if(admit) {
        this.apiService.put(Endpoints.provider.employees + '/' + rowData.id + '/admit').subscribe( () => {
          this.themeService.openSnackBar('admitSuccessMSG', null);
          this.updateTables();
        })
      }
    })
  }

  updateTables() {
    // this.updateTables();
    this.table.reloadTable();
    for(let list of this.lists) list.table.reloadTable();
  }



  openCandidate(data, selectedIndex = 0) {
    const dialogRef = this.matDialog.open(EmployeeDataComponent, { width:'90vw' });
    dialogRef.componentInstance.data = data;
    dialogRef.componentInstance.selectedIndex = selectedIndex;
  }
  

}
