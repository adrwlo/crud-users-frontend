import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {
  userForm!: FormGroup;
  userToUpdate!: User;
  id!: number;

  constructor(private fb: FormBuilder, private userService: UserService, private activatedRoute: ActivatedRoute) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
      console.log('ID from URL:', this.id);
    });

    this.userService.getUserById(this.id).subscribe((data: User) => {
      this.userToUpdate = data;
    })
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

  updateUser() {
    this.userService.updateUser(this.userForm.value).subscribe();
  }


  // initializeForm() {
  //   this.userForm = this.fb.group({
  //     name: [this.userToUpdate.name, Validators.required],
  //     surname: [this.userToUpdate.surname, Validators.required],
  //     age: [this.userToUpdate.age, [Validators.required, Validators.min(0)]],
  //     number: [this.userToUpdate.number, Validators.required],
  //     email: [this.userToUpdate.email, [Validators.required, Validators.email]],
  //   });
  // }
}
