import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { IColumnType } from 'angular2-smart-table';
import { DeleteDialogComponent } from 'src/shared/components/delete-dialog/delete-dialog.component';
import { FormMode } from 'src/shared/enums/form-mode';
import { ApiService } from 'src/shared/services/api.service';
import { Endpoints } from 'src/shared/services/endpoints';
import { ThemeService } from 'src/shared/services/theme.service';
import { ActionsComponent } from './actions/actions.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers:[DatePipe]
})
export class ListComponent implements OnInit {
  @ViewChild('dialog') dialog;
  @ViewChild('table') table;
  
  apiFunc =  (opts = {})  => this.apiService.get(Endpoints.provider.courses, {...opts});
  
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
        valuePrepareFunction: (v, r) => this.datePipe.transform(r.created_at, 'yyyy/MM/dd') ,
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
    dialog.componentInstance.header = 'DeleteCourseTitle';
    dialog.componentInstance.body = 'DeleteCourseMSG';
    // dialog.afterClosed().subscribe( r => console.log(r))
  }

  delete() {
    console.log('deleting user')
    this.apiService.delete(Endpoints.provider.courses + '/' + this.rowToDelete).subscribe( r => {
      this.themeService.openSnackBar('DeleteSuccessMSG', null);
      this.table.reloadTable();
    })
  }


}
