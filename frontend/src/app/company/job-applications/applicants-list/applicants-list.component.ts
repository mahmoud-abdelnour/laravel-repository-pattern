import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { IColumnType } from 'angular2-smart-table';
import { TableStatusComponent } from 'src/shared/components/table/table-status/table-status.component';
import { TableComponent } from 'src/shared/components/table/table.component';
import { ApiService } from 'src/shared/services/api.service';
import { Endpoints } from 'src/shared/services/endpoints';
import { ThemeService } from 'src/shared/services/theme.service';
import { ApplicantActionsComponent } from './applicant-actions/applicant-actions.component';

@Component({
  selector: 'app-applicants-list',
  templateUrl: './applicants-list.component.html',
  styleUrls: ['./applicants-list.component.scss'],
  providers:[
    DatePipe
  ]
})
export class ApplicantsListComponent implements OnInit {
  @ViewChild('dialog') dialog;
  @ViewChild('table') table:TableComponent;
  
  apiFunc =  (opts = {}) => this.apiService.get(Endpoints.company.list_emp_request_nominations + '/' + this.activatedRoute.snapshot.params['applicationId'], opts);



  constructor(
    private apiService:ApiService,
    private datePipe:DatePipe,
    private translateService:TranslateService,
    public themeService:ThemeService,
    private activatedRoute:ActivatedRoute
  ) { }

  jobs;
  settings;

  jobRequest;

  JOB_REQEUST_STATUS
  ngOnInit(): void {

    this.JOB_REQEUST_STATUS = this.themeService.settings.JOB_REQEUST_STATUS.enum

    console.log(this.JOB_REQEUST_STATUS)

    this.apiService.get(Endpoints.company.emp_requests+ '/' + this.activatedRoute.snapshot.params['applicationId']).subscribe(r => {
      // let request = r.JobRequest;
      // console.log('request', request);

      // request.job_title;
      this.jobRequest = r.JobRequest;

      this.settings = {
        columns: {
          name:{
            title: 'اسم الموظف',
            type: IColumnType.Text,
            filter: false,
            valuePrepareFunction: (v,r) => r.name_ar,
          },
          created_at:{
            title: 'تاريخ الترشيح',
            type: IColumnType.Text,
            filter: false,
            valuePrepareFunction: () => this.datePipe.transform(this.jobRequest.created_at, 'yyyy/MM/dd') ,
          },
          company_response_status:{
            title: 'موافقة الشركة',
            type: IColumnType.Custom,
            filter: false,
            renderComponent: TableStatusComponent,
            valuePrepareFunction: (v,r) => r.pivot.company_response_status,
            onComponentInitFunction : (instance) => {
              instance.statusEnum = this.themeService.settings.COMPANY_REPONSE_STATUS.enum;
            }
          },
          emp_response_status:{
            title: 'موافقة الموظف',
            type: IColumnType.Custom,
            renderComponent: TableStatusComponent,
            filter: false,
            valuePrepareFunction: (v,r) =>  r.pivot.emp_response_status,
            onComponentInitFunction : (instance) => {
              instance.statusEnum = this.themeService.settings.EMPLOYEE_REPONSE_STATUS.enum;
            }
          },
          status:{
            title: 'حالة المرشح',
            type: IColumnType.Custom,
            renderComponent: TableStatusComponent,
            filter: false,
            valuePrepareFunction: (v,r) =>  r.pivot.status,
            onComponentInitFunction : (instance) => {
              instance.statusEnum = this.themeService.settings.JOB_REQUEST_CANDIDATE_STATUS.enum;
            }
          },
          actions: {
            title: this.translateService.instant('Options'),
            type: IColumnType.Custom,
            renderComponent: ApplicantActionsComponent,
            sort: false,
            filter: false,
            onComponentInitFunction: (instance) => {
              console.log(instance);
              instance.parent = this;
            }
          }
        },
      };

    })
  }

  save(rowData, value) {
    this.apiService.put(Endpoints.company.admit_emp_request_candidate + '/' + rowData.pivot.id,value).subscribe(r => {
      this.table.reloadTable();
    })
  }



}
