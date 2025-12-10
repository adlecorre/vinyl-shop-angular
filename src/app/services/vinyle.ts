import { Injectable } from '@angular/core';
import { GenericService } from './generic';
import { Vinyle } from '../components/catalogue/catalogue';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class VinyleService extends GenericService<Vinyle>{

  constructor(http: HttpClient){
    super(http, '/vinyles')
  }
  
}
