import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { IColumnType } from 'angular2-smart-table';
import { ApiService } from 'src/shared/services/api.service';
import { Endpoints } from 'src/shared/services/endpoints';
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
  @ViewChild('table') table;
  
  settings = {
    columns: {
      course_title:{
        title: 'اسم الدورة',
        type: IColumnType.Text,
        filter: true,
      },
      period:{
        title: 'المدة',
        type: IColumnType.Text,
        filter: false,
      },
      price:{
        title: 'السعر',
        type: IColumnType.Text,
        filter: false,
      },
      date:{
        title: 'تاريخ الترشيح',
        type: IColumnType.Text,
        filter: false,
        
        valuePrepareFunction: (v, r) => this.datePipe.transform(r.pivot.created_at, 'yyyy/MM/dd') ,
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

  ngOnInit(): void {
  }

  apiFunc =  (opts = {})  => {
    return this.apiService.get(Endpoints.employee.suggested_courses, opts)
  }

  openDialog(data = null) {
    const dialogRef = this.matDialog.open(this.dialog, {
      data:{
        data,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) this.table.reloadTable();
    });
  }

}
