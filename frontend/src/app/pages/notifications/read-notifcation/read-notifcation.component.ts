import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-read-notifcation',
  templateUrl: './read-notifcation.component.html',
  styleUrls: ['./read-notifcation.component.scss']
})
export class ReadNotifcationComponent implements OnInit {
  parent;
  rowData;
  constructor() { }

  ngOnInit(): void {
  }

}
