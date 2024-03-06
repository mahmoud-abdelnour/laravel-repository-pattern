import { Component, OnInit } from '@angular/core';
import { FormMode } from 'src/shared/enums/form-mode';
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
  FormMode = FormMode;
  

  constructor(
    public themeService:ThemeService,

  ) { }

  ngOnInit(): void {
    
  }

}
