import { Component, Output, EventEmitter } from '@angular/core';
import { FormMode } from 'src/shared/enums/form-mode';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss'],
  host: {'class': 'list-actions-btns'}
})
export class ActionsComponent {
  rowData;
  parent;
  FormMode = FormMode;

}
