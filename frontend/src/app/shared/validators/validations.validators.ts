import { FormControl, FormGroup } from '@angular/forms';

// Validator: Allow Alphanumeric Characters and Space Only
export class TextFieldValidator {
    static validTextField(fc: FormControl) {
        if (fc.value != undefined || fc.value != '') {
            const regex = /^[0-9a-zA-Z ]+$/;
            if (regex.test(fc.value)) {
                return (null);
            } else {
                return ({ validTextField: true });
            }
        } else {
            return ({ validTextField: true });
        }
    }
}

// Validator: Allow Numeric Characters Only
export class NumericFieldValidator {
    static validNumericField(fc: FormControl) {
        if (fc.value != undefined) {
            const regex = /[0-9]/;
            if (regex.test(fc.value)) {
                return (null);
            } else {
                return ({ validNumericField: true });
            }
        } else {
            return (null);
        }
    }
}

// Validator: Allow Characters and Space Only
export class OnlyCharfieldValidator {
    static validOnlyCharField(fc: FormControl) {
        if (fc.value != undefined) {
            const regex = /^[a-zA-Z]*$/;
            if (regex.test(fc.value)) {
                return (null);
            } else {
                return ({ validOnlyCharField: true });
            }
        } else {
            return (null);
        }
    }
}

// Validator: Allow Email Pattern Only
export class EmailValidator {
    static validEmail(fc: FormControl) {
        if (fc.value != undefined) {
            const regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;
            if (regex.test(fc.value)) {
                return (null);
            } else {
                return ({ validEmail: true });
            }
        } else {
            return (null);
        }
    }
}

// Validator: Only White space not allowed
export class NoWhitespaceValidator {
    static notWhitespaceValidator(fc: FormControl) {
        if (fc.value != undefined) {
            const isWhitespace = (fc.value || '').trim().length === 0;
            const isValid = !isWhitespace;
            if (!isValid) {
                return ({ notWhitespaceValidator: true });
            } else {
                return (null);
            }
        } else {
            return (null);
        }
    }
}

// custom validator to check that two fields match
export function MustMatchValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}
