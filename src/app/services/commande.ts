import { Injectable } from '@angular/core';
import { GenericService } from './generic';
import { Commande } from '../models/commande';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CommandeService extends GenericService<Commande>{

  constructor(http: HttpClient){
    super(http, '/commandes')
  }
  
}
