import { Component, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-dynamic-cell',
  templateUrl: './dynamic-cell.component.html',
  styleUrls: ['./dynamic-cell.component.scss']
})
export class DynamicCellComponent implements OnInit {
  @Input('data') data;

  @ViewChild('customCell' ,{ read: ViewContainerRef, static: true }) customCell!: ViewContainerRef;
  constructor() { }

  ngOnInit(): void {
    let component = this.customCell.createComponent(this.data.renderComponent);
    component.instance['rowData'] = this.data.rowData;
    component.instance['value'] = this.data.value;
    if(this.data.onComponentInitFunction) {
      this.data.onComponentInitFunction(component.instance);
    }
  }

}
