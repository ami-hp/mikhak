import {Injectable} from '@angular/core';
import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {
  static string(msg: string = "Value must be of type String"): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }
      return typeof control.value === 'string' ? null : {string: {value: control.value, message: msg}};
    };
  }

  static password(msg: string = "This field is required"): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) {
        return null;
      }
      const hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasDigit = /\d/.test(value);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
      const validLength = value.length >= 8;
      const passwordValid = hasUpperCase && hasLowerCase && hasDigit && hasSpecialChar && validLength;

      const errors: ValidationErrors = {};
      if (!hasUpperCase) {
        errors['hasUpperCase'] = 'Password must contain at least one uppercase letter.';
      }
      if (!hasLowerCase) {
        errors['hasLowerCase'] = 'Password must contain at least one lowercase letter.';
      }
      if (!hasDigit) {
        errors['hasDigit'] = 'Password must contain at least one digit.';
      }
      if (!hasSpecialChar) {
        errors['hasSpecialChar'] = 'Password must contain at least one special character.';
      }
      if (!validLength) {
        errors['validLength'] = 'Password must be at least 8 characters long.';
      }

      if (!passwordValid) {
        return {password: {value: control.value, message: errors}};
      }
      return null;
    }

  }

  static required(msg: string = "This field is required"): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return control.value ? null : {required: {value: true, message: msg}};
    };
  }

  static min(minValue: number, msg: string = ""): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }
      if (msg.length <= 0) {
        msg = "Value must be at least " + minValue;
      }
      return control.value >= minValue ? null : {min: {minValue, actual: control.value, message: msg}};
    };
  }

  static max(maxValue: number, msg: string = ""): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }
      if (msg.length <= 0) {
        msg = "Value must be less than or equal to " + maxValue;
      }
      return control.value <= maxValue ? null : {max: {maxValue, actual: control.value, message: msg}};
    };
  }

  static minLength(minLength: number, msg: string = ""): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }
      if (msg.length <= 0) {
        msg = `Value must be at least ${minLength} characters long.`;
      }
      return control.value && control.value.length >= minLength ? null : {
        minlength: {
          requiredLength: minLength,
          actualLength: control.value ? control.value.length : 0,
          message: msg
        }
      };
    };
  }

  static maxLength(maxLength: number, msg: string = ""): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }
      if (msg.length <= 0) {
        msg = `Value must be at most ${maxLength} characters long.`;
      }
      return control.value && control.value.length <= maxLength ? null : {
        maxlength: {
          requiredLength: maxLength,
          actualLength: control.value ? control.value.length : 0,
          message: msg
        }
      };
    };
  }

  static email(msg: string = "Format must be an email"): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) {
        return null;
      }
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(value) ? null : {email: {value: control.value, message: msg}};
    };
  }
}
