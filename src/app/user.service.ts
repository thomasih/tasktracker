import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userId: number = 0;
  private apiUrl = 'http://localhost:5220/User';

  constructor(private http: HttpClient) {}

  setUserId(id: number) { this.userId = id; }
  getUserId(): number { return this.userId; }
  isUserLoggedIn(): boolean { return this.userId !== 0; }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/get_users`);
  }

  addUser(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/create_user`, user);
  }

  updateUser(user: User): Observable<any> {
    return this.http.put(`${this.apiUrl}/update_user/${user.id}`, user);
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete_user/${userId}`);
  }
}