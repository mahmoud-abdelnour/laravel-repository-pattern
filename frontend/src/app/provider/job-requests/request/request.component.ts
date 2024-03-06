import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { IColumnType } from 'angular2-smart-table';
import { finalize, of } from 'rxjs';
import { TableStatusComponent } from 'src/shared/components/table/table-status/table-status.component';
import { ApiService } from 'src/shared/services/api.service';
import { Endpoints } from 'src/shared/services/endpoints';
import { ThemeService } from 'src/shared/services/theme.service';
import { EmployeeDataComponent } from '../../shared-provider/employee-data/employee-data.component';
import { RequestEmpActionsComponent } from './request-emp-actions/request-emp-actions.component';
import { RequestStatusComponent } from './request-status/request-status.component';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss'],
  providers :[DatePipe]
})
export class RequestComponent implements OnInit {
  @ViewChild('acceptRejectNominate') acceptRejectNominate;

  constructor(
    private apiService:ApiService,
    private activatedRoute:ActivatedRoute,
    public themeService:ThemeService,
    private datePipe:DatePipe,
    private translateService:TranslateService,
    private matDialog:MatDialog,
    private router:Router
  ) { }

  requestId;
  jobRequest;
  apiFunc;
  settings = {
    columns: {
      employee:{
        title: 'اسم المرشح',
        type: IColumnType.Text,
        sort: false,
        filter: false,
        valuePrepareFunction : (v,r) => r.name_ar 
      },
      created_at:{
        title: 'تاريخ الترشيح',
        type: IColumnType.Text,
        sort: false,
        filter: false,
        valuePrepareFunction: (v,r) => this.datePipe.transform( r.pivot.created_at, 'yyyy/MM/dd'),
      },
      emp_response_status:{
        title: 'حالة الموظف',
        type: IColumnType.Custom,
        sort: false,
        filter: false,
        renderComponent: RequestStatusComponent,
        valuePrepareFunction: (v,r) => {
          return {
            enum: this.themeService.settings.EMPLOYEE_REPONSE_STATUS.enum,
            value:r.pivot.emp_response_status,
            insurance:r.insurance?.emp_file_url
          }
        },
      },
      company_response_status:{
        title: 'حالة الشركة',
        type: IColumnType.Custom,
        sort: false,
        filter: false,
        renderComponent: RequestStatusComponent,
        valuePrepareFunction: (v,r) => {
          return {
            enum: this.themeService.settings.COMPANY_REPONSE_STATUS.enum,
            value:r.pivot.company_response_status,
            insurance:r.insurance?.company_file_url
          }
        },

      },
      status:{
        title: 'حالة الإعتماد',
        type: IColumnType.Custom,
        sort: false,
        filter: false,
        renderComponent: TableStatusComponent,
        valuePrepareFunction: (v,r) => r.pivot.status,
        onComponentInitFunction: (instance) => {
          instance.statusEnum = this.themeService.settings.JOB_REQUEST_CANDIDATE_STATUS.enum;
        },
      },
      actions: {
        title: this.translateService.instant('Options'),
        type: IColumnType.Custom,
        renderComponent: RequestEmpActionsComponent,
        sort: false,
        filter: false,
        onComponentInitFunction: (instance) => instance.parent = this
      }
    },
  };
  


  ngOnInit(): void {
    this.jobRequest = null;
    this.requestId = this.activatedRoute.snapshot.params['requestId'];
    this.apiService.get(Endpoints.provider.jobRequests + '/' + this.activatedRoute.snapshot.params['requestId']).subscribe( res => {
      this.jobRequest = res.JobRequest;
      this.apiFunc = () => of({data:this.jobRequest.candidates}); //observable to the table;
    });
  }

  openAcceptRejectDialog(data) {
    const dialogRef = this.matDialog.open(this.acceptRejectNominate, {
      data:{data},
      width:'80vw'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) window.location.reload();
    });
  }

  openEmployeeDialog(data) {
    const dialogRef = this.matDialog.open(EmployeeDataComponent, { width:'90vw' });
    dialogRef.componentInstance.data = data;
    dialogRef.afterClosed().subscribe(result => {
      // if(result) this.table.reloadTable();
    });
  }


  nominateEmplloyees(nominate) {
    const dialogRef = this.matDialog.open(nominate);
    dialogRef.afterClosed().subscribe(result => {
      if(result) this.ngOnInit();
    });
  }

  isSaving = false;
  acceptRequest() {
    this.isSaving = true;
    this.apiService.put(Endpoints.provider.jobRequests + '/' + this.requestId + '/approve')
    .pipe(
      finalize(() => this.isSaving = false)
    )
    .subscribe(r => {
      this.themeService.openSnackBar('SavedSuccessfully', null);
      this.router.navigate(['/provider/job-requests/list'])
      console.log(r);
    })
  }
}
