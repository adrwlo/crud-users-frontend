import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './modules/add-user/add-user.component';
import { UpdateUserComponent } from './modules/update-user/update-user.component';
import { ListUsersComponent } from './modules/list-users/list-users.component';

const routes: Routes = [
  { path: 'add-user', component: AddUserComponent },
  { path: 'update-user/:id', component: UpdateUserComponent },
  { path: 'list-users', component: ListUsersComponent },
  { path: '', redirectTo: '/list-users', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
