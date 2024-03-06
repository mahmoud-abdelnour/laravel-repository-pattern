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
import { UserService } from 'src/shared/services/user.service';

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
  @ViewChild('table') table:TableComponent;
  
  apiFunc =  (opts = {}) => this.apiService.get(Endpoints.employee.payments, opts);

  settings = {
    columns: {
      payment_amount:{
        title: 'المبلغ',
        type: IColumnType.Text,
        filter:false
        // valuePrepareFunction: (v, r) => r.company.name_ar ,
      },
      year:{
        title: 'السنة',
        type: IColumnType.Text,
        filter: false,
        // valuePrepareFunction: (v, r) => r.job.job_title ,
      },
      subscription_type:{
        title: 'نوع الاشتراك',
        filter: false,
        type: IColumnType.Text,
        // valuePrepareFunction: (v, r) => r.company.name_ar ,
      },
      created_at:{
        title: 'تاريخ الاضافة',
        filter: false,
        type: IColumnType.Text,
        valuePrepareFunction: (v, r) => this.datePipe.transform(r.created_at, 'yyyy/MM/dd') ,
      },
      is_approved:{
        title: 'الحالة',
        type: IColumnType.Text,
        filter:false,
        valuePrepareFunction: (v, r) => v == 1 ? 'تمت الموافقة عليه' : 'معلق' ,
      },
      actions: {
        title: this.translateService.instant('Options'),
        type: IColumnType.Custom,
        renderComponent: ActionsComponent,
        sort: false,
        filter: false,
        onComponentInitFunction: (instance) => {
          console.log(instance);
          instance.parent = this;
        }
      }
    },
  };

  constructor(
    private matDialog:MatDialog,
    private apiService:ApiService,
    private translateService:TranslateService,
    public userService:UserService,
    private datePipe:DatePipe
  ) { }

  ngOnInit(): void {  }


  openDialog(data = null, mode = FormMode.Create) {
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


}

/*
membership
  amount
  file


courses
  amount
  file
  month

*/