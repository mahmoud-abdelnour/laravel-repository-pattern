import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss'],
  host: {'class': 'list-actions-btns'}
})
export class ActionsComponent implements OnInit {
  parent;
  rowData;
  view_type;

  constructor() { }

  ngOnInit(): void {
  }

}
