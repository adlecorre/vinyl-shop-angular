// panier.service.ts
import { Injectable } from '@angular/core';
import { Vinyle } from '../components/catalogue/catalogue';
import { BehaviorSubject } from 'rxjs';
// panier.service.ts
@Injectable({
  providedIn: 'root'
})
export class PanierService {

  private items: { vinyle: Vinyle; qte: number }[] = [];
  private subject = new BehaviorSubject(this.items);

  panier$ = this.subject.asObservable();

  constructor() {
    const saved = localStorage.getItem('panier');
    this.items = saved ? JSON.parse(saved) : [];
    this.subject.next(this.items)
  }

  recupererPanier(){
    return this.items
  }

  contientVinyle(v: Vinyle): boolean {
  return this.items.some(item => item.vinyle.idVinyle === v.idVinyle);
}

  private sauvegarderPanier() {
    localStorage.setItem('panier', JSON.stringify(this.items));
    this.subject.next(this.items);
  }

  ajouter(v: Vinyle) {
    const found = this.items.find(i => i.vinyle.idVinyle === v.idVinyle);
    if (found) {
      found.qte++;
    } else {
      this.items.push({ vinyle: v, qte: 1 });
    }
    this.sauvegarderPanier();
    this.subject.next(this.items);
  }

  changerQuantite(v: Vinyle, qte: number) {
    const item = this.items.find(i => i.vinyle.idVinyle === v.idVinyle);
    if (!item) return;
    item.qte = qte;
    this.sauvegarderPanier();
    this.subject.next(this.items);
  }

  retirer(v: Vinyle) {
    this.items = this.items.filter(i => i.vinyle.idVinyle !== v.idVinyle);
    this.sauvegarderPanier();
    this.subject.next(this.items);
  }

  
  viderPanier() {
    this.items = [];
    this.sauvegarderPanier();
    this.subject.next(this.items);
  }
}
