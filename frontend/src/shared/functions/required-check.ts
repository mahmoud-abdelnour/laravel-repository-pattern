import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

// export function requiredCheck(control:string):any {
//     return (form:FormGroup) => {
//         if ( form.controls[control].value !== true ) form.controls[control].setErrors({ checkError: true });
//     };
// }


export function requiredCheck(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {
        const value = control.value;
        if (value == null) return null;

        return !value ? { checkError : true } :  null;
    }
}
