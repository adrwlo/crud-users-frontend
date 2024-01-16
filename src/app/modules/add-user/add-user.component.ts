import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {
  userForm!: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) {
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
    this.userService.addUser(this.userForm.value).subscribe();
  }
}
