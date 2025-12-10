import { Injectable } from '@angular/core';
import { GenericService } from './generic';
import { HttpClient } from '@angular/common/http';
import { LigneCommande } from '../models/ligne-commande';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class LigneCommandeService extends GenericService<LigneCommande> {
  constructor(http: HttpClient){
    super(http, '/lignes')
  }

  findAllByCommandeId(commandeId: number): Observable<LigneCommande[]> {
      return this.http.get<LigneCommande[]>(environment.BACKEND_URL + this.path + "/commande/" + commandeId)
    }
}
