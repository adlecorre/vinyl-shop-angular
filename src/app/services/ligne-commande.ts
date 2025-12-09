import { Injectable } from '@angular/core';
import { GenericService } from './generic';
import { HttpClient } from '@angular/common/http';
import { LigneCommande } from '../models/ligne-commande';

@Injectable({
  providedIn: 'root',
})
export class LigneCommandeService extends GenericService<LigneCommande> {
  constructor(http: HttpClient){
    super(http, '/lignes')
  }
}
