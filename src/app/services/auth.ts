import { HttpClient } from '@angular/common/http';
import { Injectable, signal, computed } from '@angular/core';
import { environment } from '../environments/environment.development';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly url = environment.BACKEND_URL + '/auth/login';

  private _loggedIn = signal(false);
  isLoggedIn = computed(() => this._loggedIn());

  constructor(private http: HttpClient, private router: Router) {
    const storedUser = localStorage.getItem('user');
    this._loggedIn.set(!!storedUser);
  }

  findUserByUsernameAndPassword(user: User): Observable<any> {
    const body = {
      email: user.email,
      motDePasse: user.motDePasse,
    };
    return this.http.post<any>(this.url, body);
  }
  
  get currentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
}
