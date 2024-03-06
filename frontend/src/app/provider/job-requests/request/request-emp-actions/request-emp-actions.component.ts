import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/shared/services/theme.service';

@Component({
  selector: 'app-request-emp-actions',
  templateUrl: './request-emp-actions.component.html',
  styleUrls: ['./request-emp-actions.component.scss'],
  host: {'class': 'list-actions-btns'}
})
export class RequestEmpActionsComponent implements OnInit {
  parent;
  rowData;
  constructor(
    private themeService:ThemeService
  ) { }

  showInsuranceButton
  ngOnInit(): void {
    console.log(this.rowData);

    if(this.rowData.insurance) {
      this.showInsuranceButton = this.rowData.pivot.emp_response_status == this.themeService.settings.EMPLOYEE_REPONSE_STATUS.enum.accepted && 
      this.rowData.pivot.company_response_status == this.themeService.settings.COMPANY_REPONSE_STATUS.enum.accepted && 
      this.rowData.pivot.status == this.themeService.settings.JOB_REQUEST_CANDIDATE_STATUS.enum.pending;
    }


    // if(this.rowData.insurance) {
    //   this.showInsuranceButton = (this.rowData.insurance.company_file && this.rowData.insurance.emp_file) &&
    //   this.parent.jobRequest.request_status == this.themeService.settings.JOB_REQEUST_STATUS.enum.pending ;
    // }
  }
}
