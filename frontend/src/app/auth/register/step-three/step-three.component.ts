import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-step-three',
  templateUrl: './step-three.component.html',
  styleUrls: ['./step-three.component.scss'],

})
export class StepThreeComponent implements OnInit {
  @Input('tabs') tabs;
  @Input('registered_in_remote_work_platform') registered_in_remote_work_platform;
  @Input('files') files;
  @Output('submit') submit = new EventEmitter();
  @Input('isSending') isSending = false;
  @Input('progress') progress = 0;

  constructor() { }

  ngOnInit(): void { }


  submitFunc() {
    this.files.markAllAsTouched()
    this.submit.emit(true)
  }
}
