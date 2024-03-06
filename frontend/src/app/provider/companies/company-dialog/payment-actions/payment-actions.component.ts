import { Component } from '@angular/core';
import { ThemeService } from 'src/shared/services/theme.service';

@Component({
  selector: 'app-payment-actions',
  templateUrl: './payment-actions.component.html',
  styleUrls: ['./payment-actions.component.scss'],
  host: {'class': 'list-actions-btns'}
})
export class PaymentActionsComponent {
  parent;
  rowData;
  constructor(
    public themeService:ThemeService
  ) { }
}
