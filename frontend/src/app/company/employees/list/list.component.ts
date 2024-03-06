import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { IColumnType } from 'angular2-smart-table';
import { TableComponent } from 'src/shared/components/table/table.component';
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
  FormMode = FormMode;
  
  @ViewChild('dialog') dialog;
  @ViewChild('resignDialog') resignDialog;
  @ViewChild('table') table:TableComponent;
  apiFunc =  (opts = {}) => this.apiService.get(Endpoints.company.list_employees, opts);

  settings;
  
  constructor(
    private matDialog:MatDialog,
    private apiService:ApiService,
    private datePipe:DatePipe,
    private translateService:TranslateService,
    private themeService:ThemeService
  ) { }

  jobs = {};
  ngOnInit(): void {
    this.apiService.get(Endpoints.employee.jobs).subscribe(r => {
      for(let job of r.jobs) {
        this.jobs[job.id] = job
      }
      this.settings = {
        columns: {
          employee:{
            title: 'الموظف',
            type: IColumnType.Text,
            filter: true,
            valuePrepareFunction : (v,r) => r.name_ar 
          },
          job_id:{
            title: 'الوظيفة',
            type: IColumnType.Text,
            filter: true,
            valuePrepareFunction : (v,r) => this.jobs[v].job_title 
          },
          date:{
            title: 'تاريخ التعاقد',
            type: IColumnType.Text,
            valuePrepareFunction: (v,r) => this.datePipe.transform( r.pivot.work_start_date, 'yyyy/MM/dd'),
          },
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
    })
  }

  openDialog(mode = FormMode.Create, data = null) {
    const dialogRef = this.matDialog.open(this.dialog, {
      data:{
        data,
        mode
      },
      width:"80vw"
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) this.table.reloadTable()
    });
  }


  
  
  openResignDialog(mode = FormMode.Create, data = null) {
    const dialogRef = this.matDialog.open(this.resignDialog, {
      data:{
        data,
        mode
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) this.table.reloadTable()
    });
  }
}
