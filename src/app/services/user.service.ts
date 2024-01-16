import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/getUsers`);
  }

  getUserById(userId: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/api/getUser/${userId}`);
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/api/addUser`, user);
  }

  addUsers(users: User[]): Observable<User[]> {
    return this.http.post<User[]>(`${this.baseUrl}/api/addUsers`, users);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/api/updateUser`, user);
  }

  deleteUser(userId: number): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/api/deleteUser/${userId}`);
  }
}
