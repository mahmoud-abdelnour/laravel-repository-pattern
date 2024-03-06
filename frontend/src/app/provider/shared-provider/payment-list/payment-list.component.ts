import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { IColumnType } from 'angular2-smart-table';
import { DeleteDialogComponent } from 'src/shared/components/delete-dialog/delete-dialog.component';
import { TableStatusComponent } from 'src/shared/components/table/table-status/table-status.component';
import { ApiService } from 'src/shared/services/api.service';
import { Endpoints } from 'src/shared/services/endpoints';
import { ThemeService } from 'src/shared/services/theme.service';
import { PaymentActionsComponent } from './payment-actions/payment-actions.component';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.scss']
})
export class PaymentListComponent implements OnInit {
  @Input('employeeData') employeeData;
  @Input('subscription_type') subscription_type;
  @ViewChild('paymentTable') paymentTable;

  apiFunc = () => this.apiService.get(`${Endpoints.provider.employees}/${this.employeeData.id}/payments`, {subscription_type:this.subscription_type});
  
  settings;
  
  constructor(
    public themeService:ThemeService,
    private apiService:ApiService,
    private translateService:TranslateService,
    private matDialog:MatDialog
  ) { }

  ngOnInit(): void {
    if(this.subscription_type == this.themeService.settings.SUBSCRIPTION_TYPE.enum.courses) {
      this.settings = {
        columns: {
          payment_amount:{
            title: 'المبلغ',
            type: IColumnType.Text,
            valuePrepareFunction: (v, r) => (v || 0) + ' ريال ' ,
            filter: false,
          },
          payment_file_url:{
            title: 'رابط الإيصال',
            type: IColumnType.Html,
            valuePrepareFunction: (v, r) => `<a href="${v}" target="_blank"> رابط الإيصال </a>` ,
            filter: false,
          },
          approved_by_user:{
            title: 'تفعيل بواسطة',
            type: IColumnType.Text,
            filter: false,
          },
          is_approved:{
            title: 'الحالة',
            type: IColumnType.Custom,
            filter: false,
            renderComponent: TableStatusComponent,
            onComponentInitFunction: (instance) => {
              instance.statusEnum = this.themeService.settings.EMP_SUBSCRIPTION_APPROVE.enum;
            },
          },
          actions: {
            title: this.translateService.instant('Options'),
            type: IColumnType.Custom,
            renderComponent: PaymentActionsComponent,
            sort: false,
            filter: false,
            onComponentInitFunction: (instance) => instance.parent = this
          }
        },
      };
    } else {
      this.settings = {
        columns: {
          month:{
            title: 'الشهر',
            type: IColumnType.Text,
            filter: false,
            valuePrepareFunction: (v, r) => v + '/' + r.year ,

          },
          payment_amount:{
            title: 'المبلغ',
            type: IColumnType.Text,
            valuePrepareFunction: (v, r) => (v || 0) + ' ريال ' ,
            filter: false,
          },
          payment_file_url:{
            title: 'رابط الإيصال',
            type: IColumnType.Html,
            valuePrepareFunction: (v, r) => `<a href="${v}" target="_blank"> رابط الإيصال </a>` ,
            filter: false,
          },
          approved_by_user:{
            title: 'تفعيل بواسطة',
            type: IColumnType.Text,
            filter: false,
          },
          is_approved:{
            title: 'الحالة',
            type: IColumnType.Custom,
            filter: false,
            renderComponent: TableStatusComponent,
            onComponentInitFunction: (instance) => {
              instance.statusEnum = this.themeService.settings.EMP_SUBSCRIPTION_APPROVE.enum;
            },
          },
          actions: {
            title: this.translateService.instant('Options'),
            type: IColumnType.Custom,
            renderComponent: PaymentActionsComponent,
            sort: false,
            filter: false,
            onComponentInitFunction: (instance) => instance.parent = this
          }
        },
      };
    }
  }


  takeAction(rowData, status) {
    let statusEnum = this.themeService.settings.EMP_SUBSCRIPTION_APPROVE.enum;
    statusEnum[status];

    let dialog = this.matDialog.open(DeleteDialogComponent);
    dialog.componentInstance.header = statusEnum[status] + 'PaymentTitle';
    dialog.componentInstance.body = statusEnum[status] + 'PaymentMSG';
    dialog.componentInstance.confirmBtn = statusEnum[status] + 'PaymentBtn';

    dialog.afterClosed().subscribe( ban => {
      if(ban) {
        this.apiService.put(Endpoints.provider.employees + '/payments/' + rowData.id, {status}).subscribe(r => {
          this.themeService.openSnackBar('SavedSuccessfully', null);
          this.paymentTable.reloadTable();
        })
      }
    })
  }


}
