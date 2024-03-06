import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/shared/services/theme.service';

@Component({
  selector: 'app-company-status',
  templateUrl: './company-status.component.html',
  styleUrls: ['./company-status.component.scss'],
  host: {'class': 'status'}
})
export class CompanyStatusComponent implements OnInit {
  statusEnum;
  value
  constructor(
    private themeService:ThemeService
  ) { }

  ngOnInit(): void {

    this.statusEnum = this.themeService.settings.COMPANY_REPONSE_STATUS.enum;
  }

}
