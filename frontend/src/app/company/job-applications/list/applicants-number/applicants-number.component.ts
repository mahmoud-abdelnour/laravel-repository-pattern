import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-applicants-number',
  templateUrl: './applicants-number.component.html',
  styleUrls: ['./applicants-number.component.scss']
})
export class ApplicantsNumberComponent implements OnInit {
  rowData;
  value
  constructor() { }

  ngOnInit(): void {
  }

}
