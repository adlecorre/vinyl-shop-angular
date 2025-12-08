import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url: string

  constructor(private http:HttpClient){
    this.url = environment.BACKEND_URL + '/auth/login'
  }

  findUserByUsernameAndPassword(user: User): Observable<Token>{
    const body = {
      email: user.email,
      motDePasse: user.motDePasse
    }
  return this.http.post<Token>(this.url, body, { headers: { 'Content-Type': 'application/json' } });
 }

}
