import { Directive } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[validate-onblur]',
  host: {
    '(focus)': 'onFocus($event)',
    '(blur)': 'onBlur($event)',
    '(keyup)': 'onKeyup($event)',
    '(change)': 'onChange($event)',
    '(ngModelChange)': 'onNgModelChange($event)'
  }
})
export class ValidateOnblurDirective {

  constructor(public formControl: NgControl) {
  }

  private validators: any;
  private asyncValidators: any;
  private wasChanged: any;

  onFocus($event:any) {
    this.wasChanged = false;
    this.validators = (this.formControl.control as any).validator;
    this.asyncValidators = (this.formControl.control as any).asyncValidator;
    (this.formControl.control as any).clearAsyncValidators();
    (this.formControl.control as any).clearValidators();
    (this.formControl.control as any).setValidators(null);
    (this.formControl.control as any).setErrors(null);
  }
  onKeyup($event:any) {
    this.wasChanged = true; // keyboard change
  }
  onChange($event:any) {
    this.wasChanged = true; // copypaste change
  }
  onNgModelChange($event:any) {
    this.wasChanged = true; // ng-value change
  }

  onBlur($event:any) {
    (this.formControl.control as any).setAsyncValidators(this.asyncValidators);
    (this.formControl.control as any).setValidators(this.validators);
    if (this.wasChanged) {
      (this.formControl.control as any).updateValueAndValidity();
    }
  }

}
