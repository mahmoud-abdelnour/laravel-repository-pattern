import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { IColumnType } from 'angular2-smart-table';
import { finalize } from 'rxjs';
import { DeleteDialogComponent } from 'src/shared/components/delete-dialog/delete-dialog.component';
import { TableStatusComponent } from 'src/shared/components/table/table-status/table-status.component';
import { TableComponent } from 'src/shared/components/table/table.component';
import { ApiService } from 'src/shared/services/api.service';
import { Endpoints } from 'src/shared/services/endpoints';
import { ThemeService } from 'src/shared/services/theme.service';
import { PaymentActionsComponent } from './payment-actions/payment-actions.component';

@Component({
  selector: 'app-company-dialog',
  templateUrl: './company-dialog.component.html',
  styleUrls: ['./company-dialog.component.scss']
})
export class CompanyDialogComponent implements OnInit {
  @Input('data') data;
  @Input('ref') ref;
  @Input('selectedIndex') selectedIndex = 0;

  @ViewChild('paymentTable') paymentTable:TableComponent;

  apiFunc = () => this.apiService.get(`${Endpoints.provider.companies}/${this.data.id}/payments`);

  settings = {
    columns: {
      month:{
        title: 'الشهر',
        type: IColumnType.Text,
        filter: false,
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
          instance.statusEnum = this.themeService.settings.COMPANY_SUBSCRIPTION_APPROVE.enum;
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
  
  files = [
    'commercial_record_file',
    'tax_registration_certificate_file',
    'national_address_file'
  ];

  constructor(
    private apiService:ApiService,
    public  themeService:ThemeService,
    private translateService:TranslateService,
    private matDialog:MatDialog
  ) { }

  form:FormGroup;

  ngOnInit(): void {
    
    this.form = new FormGroup({});
    for(let file of this.files) {
      this.form.addControl(file, new FormControl( {value:this.data[file+'_url'], disabled:true}) )
    }

  }

  
  takeAction(rowData, status) {
    let statusEnum = this.themeService.settings.COMPANY_SUBSCRIPTION_APPROVE.enum;
    statusEnum[status];

    let dialog = this.matDialog.open(DeleteDialogComponent);
    dialog.componentInstance.header = statusEnum[status] + 'PaymentTitle';
    dialog.componentInstance.body = statusEnum[status] + 'PaymentMSG';
    dialog.componentInstance.confirmBtn = statusEnum[status] + 'PaymentBtn';

    dialog.afterClosed().subscribe( ban => {
      if(ban) {
        this.apiService.put(Endpoints.provider.companies + '/payments/' + rowData.id, {status}).subscribe(r => {
          this.themeService.openSnackBar('SavedSuccessfully', null);
          this.paymentTable.reloadTable();
        })
      }
    })
  }
  


  isSaving = false;
  save() {
    this.isSaving = true;

    this.apiService.put(`${Endpoints.provider.companies}/${this.data.id}/admit`)
    .pipe(
      finalize(() => this.isSaving = false)
    )
    .subscribe(r => {
      this.themeService.openSnackBar('SavedSuccessfully', null);
      this.ref.close(true);
    })
  }


}
