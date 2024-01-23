import { Component, ViewChild } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { MatSort } from '@angular/material/sort';

export interface ListUserFilterState {
  filter: string,
  email: string,
  age: number | null,
}

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent {
  users: User[] = [];
  displayedColumns: string[] = ['id', 'name', 'surname', 'age', 'number', 'email', 'update', 'delete'];
  dataSource = new MatTableDataSource<User>();
  ageOptions: string[] = Array.from({ length: 100 }, (_, i) => (i + 1).toString());
  emailOptions: string[] = [];
  filterState: ListUserFilterState = {
    filter: '',
    email: '',
    age: null,
  };

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userService: UserService, private router: Router, public dialog: MatDialog) {
    this.loadUsersFromDatabase();
  }

  loadUsersFromDatabase() {
    this.userService.getUsers().subscribe((data: User[]) => {
      this.users = data;
      this.dataSource = new MatTableDataSource<User>(this.users);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.emailOptions = this.extractUniqueDomainsFromEmails(this.users.map(user => user.email));
    })
  }

  extractUniqueDomainsFromEmails(emails: string[]): string[] {
    const uniqueDomains = new Set<string>();
  
    emails.forEach(email => {
      const [, domain] = email.split('@'); 
      if (domain) {
        uniqueDomains.add('@'+domain.toLowerCase()); 
      }
    });
  
    return Array.from(uniqueDomains); 
  }

  refresh() {
    const filterValue = this.filterState.filter.toLowerCase();
    const ageFilter = this.filterState.age !== null ? this.filterState.age.toString() : undefined; // Exclude null values
    const emailFilter = this.filterState.email ? this.filterState.email.toLowerCase() : '';
  
    const filteredUsers = this.users.filter(x =>
      (emailFilter === '' || x.email.toLowerCase().includes(emailFilter)) &&
      (ageFilter === undefined || x.age.toString() === ageFilter) &&
      (filterValue === '' ||
        x.name.toLowerCase().includes(filterValue) ||
        x.surname.toLowerCase().includes(filterValue)
      )
    );
  
    this.dataSource = new MatTableDataSource<User>(filteredUsers);
    this.dataSource.paginator = this.paginator;
  }
  
  goToAddUser() {
    this.router.navigate(['/add-user']);
  }

  goToUpdateUser(id: number) {
    this.router.navigate(['/update-user/'+id])
  }

  openDialog(id: number, enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '400px',
      data: { id },
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe((deleted: boolean) => {
      if (deleted) {
        this.loadUsersFromDatabase();
        this.paginator.firstPage();
      }
    });
  }
}
