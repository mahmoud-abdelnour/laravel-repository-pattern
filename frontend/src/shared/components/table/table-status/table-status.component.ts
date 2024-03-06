import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-status',
  templateUrl: './table-status.component.html',
  styleUrls: ['./table-status.component.scss'],
  host: {'class': 'status'}
})
export class TableStatusComponent implements OnInit {

  @Input('statusEnum') statusEnum;
  @Input('value') value;

  _value
  ngOnInit(): void {
    this._value = this.statusEnum && this.statusEnum[this.value] ? this.statusEnum[this.value] : this.value
  }

}
