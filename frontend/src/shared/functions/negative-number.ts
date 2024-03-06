import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function checkChars(chars): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {
        const value = control.value;
        if (!value) return null;

        return value.toString().includes(chars) ? { cantBeNegative : true } :  null;
    }
}

export function onlyInteger(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {
        const value = control.value;
        if (!value) return null;
        // /^[0-9]*[^\.]$/.test(value) 
        let hasError =  value.toString().includes('-') || value.toString().includes('.') || value.toString().includes('/') || value.toString().includes('*') || value < 1  ;
        return hasError ? { notValidInteger : true } :  null;

        // /^(?!\.)*(?!\*)*(?!\/)[\d\/]*$/.test(99.5)
    }
}



export function NoZeros(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {
        const value = control.value;
        if (!value) return null;
      
        let hasError =  /^0+$/.test(value)  ;
        console.log(hasError);
        return hasError ? { NoZeros : false } :  null;

        // /^(?!\.)*(?!\*)*(?!\/)[\d\/]*$/.test(99.5)
    }
}

export function Iban():ValidatorFn{
    return (control:AbstractControl) : ValidationErrors | null => {
        let value = control.value;
        if (!value) return null;
        
        value = value.trim();

        if (value.length !== 22) {
            return { Iban : false } ;
        }

      /*   if (!value.startsWith("SA")) {
            return { isIban : false } ;
        } */

        return null; 

    }
}

// export const checkNegative = (control:AbstractControl) : ValidationErrors | null => {
//     const value = control.value;
//     if (!value) return null;

//     return value.toString().includes('-') ? { cantBeNegative : true } :  null;
// }
