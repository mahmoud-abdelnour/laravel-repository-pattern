import { AbstractControl, FormGroup, ValidatorFn } from "@angular/forms";

export function compareValues(controlOne:string, controlTwo: string): any {
    return (form:FormGroup) => {
        if (
            form.controls[controlOne].value !== form.controls[controlTwo].value &&
            form.controls[controlOne].value && form.controls[controlTwo].value
        ) form.controls[controlTwo].setErrors({ matchError: true });
        
        // else form.controls[controlTwo].setErrors(form.controls[controlTwo].errors);
        // return  form.controls[controlTwo].setErrors(null);
    };
}