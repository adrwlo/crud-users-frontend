import { AbstractControl, Validators } from '@angular/forms';

export class CustomValidators {

  static notEmpty(control: AbstractControl): { [key: string]: any } | null {
    const value = control.value;
    return (value && value.trim().length === 0) ? { 'notEmpty': true } : null;
  }

  static validNumber(control: AbstractControl): { [key: string]: any } | null {
    const value = control.value;
    return (value && !isNaN(value) && value.toString().length === 9) ? null : { 'validNumber': true };
  }
  
  static validEmail(control: AbstractControl): { [key: string]: any } | null {
    const value = control.value;
    return Validators.email(control) || (!value.includes('@') ? { 'validEmail': true } : null);
  }
}