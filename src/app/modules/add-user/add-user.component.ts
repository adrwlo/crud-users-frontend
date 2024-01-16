import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {
  userForm!: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private matSnackBar: MatSnackBar, private router: Router) {
    this.initializeForm();
  }

  initializeForm() {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(0)]],
      number: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  addUser() {
    console.log(this.userForm.value);
    this.userService.addUser(this.userForm.value).subscribe(() => console.log('added user!'));
    this.openSnackBar('test', 'tets');
    setTimeout(() => {
      this.goToListUsers();
    }, 1200);
  }

  openSnackBar(message: string, action: string) {
    this.matSnackBar.open(message, action, {duration: 1000});
  }

  goToListUsers() {
    this.router.navigate(['/list-users']);
  }
}
