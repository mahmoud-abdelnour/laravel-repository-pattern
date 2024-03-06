import { Component, Input, OnInit } from '@angular/core';
import { FormMode } from 'src/shared/enums/form-mode';

@Component({
  selector: 'app-view-msg',
  templateUrl: './view-msg.component.html',
  styleUrls: ['./view-msg.component.scss']
})
export class ViewMsgComponent implements OnInit {

  @Input('data') data;
  @Input('view_type') view_type;
  @Input('mode') mode;
  @Input('ref') ref;

  FormMode = FormMode;
  constructor() { }

  ngOnInit(): void {
    //console.log(this.view_type)
  }


}
