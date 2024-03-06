import { Component, EventEmitter, Input, OnInit,Output } from '@angular/core';
import { FormMode } from 'src/shared/enums/form-mode';

@Component({
  selector: 'app-file-input[control]',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.scss'],
})
export class FileInputComponent implements OnInit {
  @Input('control') control;
  @Input('accept') accept = 'image/*';
  // @Input('mode') mode;
  @Output() deleteEvent = new EventEmitter();

  FormMode = FormMode;
  constructor() { }

  fileName;
  ngOnInit(): void {
    if(this.control.value && typeof this.control.value == 'string') this.fileName = this.control.value.substr(this.control.value.lastIndexOf('/') + 1);
    // else if (this.control.value && this.control.value instanceof File) {
    //   console.log('yeah is file');
    //   this.file = this.control.value;
    //   this.fileSize = (this.file.size / 1000000).toFixed(2);
    // }

    // console.log(this.control.disabled)
  }



  file;
  fileSize;
  fileChanged(ev) {
    this.file = ev.target.files[0];
    this.fileSize = (this.file.size / 1000000).toFixed(2);
    this.control.setValue(ev.target.files[0]);
    this.control.markAsTouched();
  }

  deleteFile(input) {
    this.file = null;
    input.type = '';
    input.type = 'file';
    this.control.setValue(null);
    console.log(this.control);
    this.deleteEvent.emit(this.control);
  }

}
