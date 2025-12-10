import { Injectable } from '@angular/core';
import { GenericService } from './generic';
import { Commande } from '../models/commande';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommandeService extends GenericService<Commande>{

  constructor(http: HttpClient){
    super(http, '/commandes')
  }

  findAllByUser(utilisateurId: number): Observable<Commande[]> {
    return this.http.get<Commande[]>(environment.BACKEND_URL + this.path + "/user/" + utilisateurId)
  }
  
}
