import {AbstractControl} from '@angular/forms';

export class ConfirmPasswordValidator {
    static MatchPassword(control: AbstractControl) {
       const password = control.get('password').value;

       const confirmPassword = control.get('passwordConfirm').value;

        if (password !== confirmPassword) {
            control.get('passwordConfirm').setErrors( { 'mismatch': true } );
        } else {
            return null;
        }
    }
}
