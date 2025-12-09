import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = environment.BACKEND_URL + '/users';

  constructor(private http: HttpClient) {}

  getCurrentUser(): Observable<User> {
    const userStr = localStorage.getItem('user');
    if (!userStr) throw new Error('Pas d’utilisateur connecté');
    const user = JSON.parse(userStr);
    return this.http.get<User>(`${this.apiUrl}/email/${user.email}`);
    console.log(user.email);
  }

  updateUser(userId: number, updatedUser: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${userId}`, updatedUser);
  }
  
}
