import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {
  userForm!: FormGroup;
  id!: number;

  constructor(private fb: FormBuilder, private userService: UserService, private activatedRoute: ActivatedRoute, private router: Router, private matSnackBar: MatSnackBar) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
      console.log('ID from URL:', this.id);
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
    })
  }

  initializeForm() {
    this.userForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(0)]],
      number: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  updateUser() {
    this.userService.updateUser(this.userForm.value).subscribe();
    this.openSnackBar("test", "test2");
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
