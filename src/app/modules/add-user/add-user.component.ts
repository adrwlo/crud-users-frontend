import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { CustomValidators } from 'src/app/validators/CustomValidators';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {
  userForm!: FormGroup;

  ageOptions: number[] = Array.from({ length: 100 }, (_, i) => i + 1);

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private matSnackBar: MatSnackBar,
    private router: Router
  ) {
    this.initializeForm();
  }

  initializeForm() {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, CustomValidators.notEmpty]],
      surname: ['', [Validators.required, CustomValidators.notEmpty]],
      number: ['', [Validators.required, CustomValidators.validNumber]],
      email: ['', [Validators.required, CustomValidators.validEmail]],
      age: [null, [Validators.required]]
    });
  }

  getErrorMessage(controlName: string) {
    const control = this.userForm.get(controlName);
    if (control?.hasError('required')) {
      return 'You must enter a value';
    }

    if (controlName === 'email' && control?.hasError('email')) {
      return 'Not a valid email';
    }

    if (controlName === 'number' && control?.hasError('validNumber')) {
      return 'Not a valid number phone';
    }

    return '';
  }

  checkFormErrors() {
    Object.keys(this.userForm.controls).forEach(controlName => {
      const control = this.userForm.get(controlName);
      if (control?.invalid) {
        control.markAsTouched();
        control.markAsDirty();
      }
    });
  }

  addUser() {
    this.checkFormErrors();
    if (this.userForm.invalid) {
      this.openSnackBar('Error', 'Not valid data');
      return;
    } else {
      this.userService.addUser(this.userForm.value).subscribe(() => console.log('added user!'));
      this.openSnackBar('Success', 'Added new user!');
      setTimeout(() => {
        this.goToListUsers();
      }, 2000);
    }
  }

  openSnackBar(message: string, action: string) {
    this.matSnackBar.open(message, action, { duration: 2000 });
  }

  goToListUsers() {
    this.router.navigate(['/list-users']);
  }
}
