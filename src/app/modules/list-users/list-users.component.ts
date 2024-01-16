import { Component, ViewChild } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent {

  users: User[] = [];
  displayedColumns: string[] = ['id', 'name', 'surname', 'age', 'number', 'email', 'update', 'delete'];
  dataSource = new MatTableDataSource<User>();
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private userService: UserService, private router: Router) {
    this.userService.getUsers().subscribe((data: User[]) => {
      this.users = data;
      this.dataSource = new MatTableDataSource<User>(this.users);
      this.dataSource.paginator = this.paginator;
    })
  }

  goToAddUser() {
    this.router.navigate(['/add-user']);
  }

  goToUpdateUser(id: number) {
    this.router.navigate(['/update-user/'+id])
  }
}
