import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { CustomValidators } from 'src/app/validators/CustomValidators';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {
  userForm!: FormGroup;
  originalUserForm!: User;
  id!: number;
  ageOptions: number[] = Array.from({ length: 100 }, (_, i) => i + 1);

  constructor(private fb: FormBuilder, private userService: UserService, private activatedRoute: ActivatedRoute, private router: Router, private matSnackBar: MatSnackBar) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
    });

    this.userService.getUserById(this.id).subscribe((data: User) => {
      this.userForm.patchValue({
        id: data.id,
        name: data.name,
        surname: data.surname,
        age: data.age,
        number: data.number,
        email: data.email,
      });

      this.originalUserForm = ({
        id: data.id,
        name: data.name,
        surname: data.surname,
        age: data.age,
        number: data.number,
        email: data.email,
      })
    })
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

  areFieldsChanged(): boolean {
    const formValues = this.userForm.value;
    const originalFormValues = this.originalUserForm as any;
   
    return Object.keys(formValues).some(key => formValues[key] !== originalFormValues[key]);
  }

  updateUser() {
    this.checkFormErrors();
    if (this.userForm.invalid) {
      this.openSnackBar('Error', 'Not valid data');
    } else if (!this.areFieldsChanged()) {
      this.openSnackBar('Error', 'Not data changed');
    } else {
      this.userService.updateUser(this.userForm.value).subscribe();
      this.openSnackBar('Success', `Updated user with id: ${this.id}`);
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
