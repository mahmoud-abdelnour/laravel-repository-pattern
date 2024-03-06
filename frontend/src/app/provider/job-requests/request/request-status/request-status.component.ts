import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-request-status',
  templateUrl: './request-status.component.html',
  styleUrls: ['./request-status.component.scss']
})
export class RequestStatusComponent implements OnInit {
  value;
  
  constructor() { }

  ngOnInit(): void {
  }

}
