import { Component, Input, OnInit } from '@angular/core';
import { FormMode } from 'src/shared/enums/form-mode';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  host: { class:'app-dialog' }
})
export class CreateComponent implements OnInit {
  @Input('data') data;
  @Input('mode') mode;
  @Input('ref') ref;

  FormMode = FormMode;
  constructor() { }

  ngOnInit(): void {
    console.log(this.data)
  }

}
