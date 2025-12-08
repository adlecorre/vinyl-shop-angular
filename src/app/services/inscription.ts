import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { email } from '@angular/forms/signals';

@Injectable({
  providedIn: 'root',
})
export class InscriptionService {
  url: string

  constructor(private http:HttpClient){
    this.url = environment.BACKEND_URL + '/auth/register'
  }

 addUser(user: User): Observable<string>{
  return this.http.post(this.url, user, {
    headers: { 'Content-Type': 'application/json' },
    responseType: 'text'
  });
 }
}
