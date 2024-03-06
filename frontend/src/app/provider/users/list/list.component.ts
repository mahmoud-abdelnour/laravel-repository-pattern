import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { IColumnType } from 'angular2-smart-table';
import { DeleteDialogComponent } from 'src/shared/components/delete-dialog/delete-dialog.component';
import { TableComponent } from 'src/shared/components/table/table.component';
import { FormMode } from 'src/shared/enums/form-mode';
import { PermissionsType } from 'src/shared/enums/permissions-types';
import { ApiService } from 'src/shared/services/api.service';
import { Endpoints } from 'src/shared/services/endpoints';
import { ThemeService } from 'src/shared/services/theme.service';
import { ActionsComponent } from './actions/actions.component';
import { RolesChipsComponent } from './roles-chips/roles-chips.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @ViewChild('dialog') dialog;
  @ViewChild('permissionDialog') permissionDialog;
  @ViewChild('table') table:TableComponent;
  PermissionsType = PermissionsType;
  settings = {
    columns: {
      name:{
        title: this.translateService.instant('Name'),
        type: IColumnType.Text,
        filter: true,
      },
      email:{
        title: this.translateService.instant('Email'),
        type: IColumnType.Text,
        filter: true,
      },
      roles:{
        title: this.translateService.instant('Role'),
        type: IColumnType.Custom,
        renderComponent: RolesChipsComponent,
        sort: false,
        filter: false,
        valuePrepareFunction: (v, r) => v.map(x => x.name),
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
    private themeService:ThemeService,
    private translateService:TranslateService
  ) { }

  ngOnInit(): void {
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
    this.apiService.delete(Endpoints.provider.users + '/' + this.rowToDelete).subscribe( r => {
      this.themeService.openSnackBar('DeleteSuccessMSG', null);
      this.table.reloadTable();
    })
  }
  
  openDialog(mode = FormMode.Create, data = null) {
    const dialogRef = this.matDialog.open(this.dialog, {
      data:{
        data,
        mode
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.table.reloadTable();
      }
    });
  }

  openPermissions(data) {
    const dialogRef = this.matDialog.open(this.permissionDialog, {
      data:{
        data,
      }
    });

    dialogRef.afterClosed().subscribe(permissions => {
      if(permissions) {
        let newData = {...data, permissions, roles : data.roles.map(r => r.id)};
        delete newData.settings;
        this.apiService.put( `${Endpoints.provider.users}/${data.id}`, newData ).subscribe(r => {
          this.themeService.openSnackBar('SavedSuccessfully', null);
          this.table.reloadTable();
        })
      }
    });
  }

  apiFunc = (filter) => {
    return this.apiService.get(Endpoints.provider.users, filter)
  }

}
