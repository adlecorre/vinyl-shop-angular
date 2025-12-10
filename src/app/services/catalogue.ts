import { Injectable } from '@angular/core';
import { GenericService } from './generic';
import { Vinyle } from '../components/catalogue/catalogue';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CatalogueService extends GenericService<Vinyle> {
  constructor(http: HttpClient){
    super(http, '/vinyles')
  }

  findByTitre(titre: string): Observable<Vinyle>{
    return this.http.get<Vinyle>(`${environment.BACKEND_URL}${this.path}/titre/${titre}`)
  }

  updateStock(vinyleId: number, stock: number): Observable<Vinyle> {
    return this.http.put<Vinyle>(`${environment.BACKEND_URL}${this.path}/${vinyleId}/stock`, stock);
  }

}
