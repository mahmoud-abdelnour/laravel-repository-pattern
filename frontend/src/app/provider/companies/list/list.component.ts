import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { IColumnType } from 'angular2-smart-table';
import { DeleteDialogComponent } from 'src/shared/components/delete-dialog/delete-dialog.component';
import { TableStatusComponent } from 'src/shared/components/table/table-status/table-status.component';
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
  @ViewChild('table') table;
  @ViewChild('companyDialog') companyDialog;
  
  @Input('apiFunc') apiFunc;
  @Input('lists') lists;
  @Input('paginationId') paginationId;
  
  settings = {
    columns: {
      name_ar:{
        title: 'اسم الشركة',
        type: IColumnType.Text,
        filter: true,
      },
      approved_at:{
        title: 'تاريخ التعاقد',
        type: IColumnType.Text,
        valuePrepareFunction: (v, r) => this.datePipe.transform(v, 'yyyy/MM/dd') ,
      },
      approved_by_user:{
        title: 'تفعيل بواسطة',
        type: IColumnType.Text,
      },
      status:{
        title: 'الحالة',
        type: IColumnType.Custom,
        filter: false,
        renderComponent: TableStatusComponent,
        onComponentInitFunction: (instance) => {
          instance.statusEnum = this.themeService.settings.COMPANY_STATUS.enum;
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


  rowToDelete;
  popDelete(rowData) {
    this.rowToDelete = rowData.id;
    let dialog = this.matDialog.open(DeleteDialogComponent, {
      data:{
        parent:this
      },
    });
    dialog.componentInstance.header = 'DeleteCompanyTitle';
    dialog.componentInstance.body = 'DeleteCompanyMSG';
  }

  delete() {
    this.apiService.delete(Endpoints.provider.companies + '/' + this.rowToDelete).subscribe( r => {
      this.themeService.openSnackBar('DeleteSuccessMSG', null);
      this.updateTables();
    })
  }


  banCompany(rowData) {
    let dialog = this.matDialog.open(DeleteDialogComponent);
    dialog.componentInstance.header = 'BanCompanyTitle';
    dialog.componentInstance.body = 'BanCompanyMSG';
    dialog.componentInstance.confirmBtn = 'BanBtn';
    dialog.afterClosed().subscribe( ban => {
      if(ban) {
        this.apiService.put(Endpoints.provider.companies + '/' + rowData.id + '/ban').subscribe(r => {
          this.themeService.openSnackBar('BanSuccessMSG', null);
          this.updateTables();
        })
      }
    })
  }


  openCompany(data, selectedIndex = 0) {
    let dialog = this.matDialog.open(this.companyDialog, {
      data:{
        data,
        selectedIndex
      },
      width:'90vw'
    });
    dialog.afterClosed().subscribe( res => {
      if(res) this.updateTables();
    })
  }


  updateTables() {
    this.table.reloadTable();
    for(let list of this.lists) list.table.reloadTable();
  }


}
