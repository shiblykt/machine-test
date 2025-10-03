import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appNoSpecialChars]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: NoSpecialCharsDirective,
    multi: true
  }],
  standalone: true
})
export class NoSpecialCharsDirective implements Validator {
  private specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]+/;

  validate(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }

    const hasSpecialChars = this.specialChars.test(control.value);
    return hasSpecialChars ? { hasSpecialChars: { value: 'Special characters are not allowed' } } : null;
  }
}
