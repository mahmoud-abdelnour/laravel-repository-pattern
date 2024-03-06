import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/shared/services/theme.service';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss'],
  host: {'class': 'list-actions-btns'}
})
export class ActionsComponent implements OnInit {
  parent;
  rowData;

  constructor(
    private themeService:ThemeService
  ) { }

  showAttach;
  ngOnInit(): void {
    this.showAttach = this.rowData.pivot.company_response_status == this.themeService.settings.COMPANY_REPONSE_STATUS.enum.accepted &&
    this.rowData.pivot.emp_response_status == this.themeService.settings.EMPLOYEE_REPONSE_STATUS.enum.accepted
    
  }

}
