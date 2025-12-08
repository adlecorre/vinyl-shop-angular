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

  ajouter(v: Vinyle) {
    const found = this.items.find(i => i.vinyle.id_vinyles === v.id_vinyles);

    if (found) {
      found.qte++;
    } else {
      this.items.push({ vinyle: v, qte: 1 });
    }

    this.subject.next(this.items);
  }

  changerQuantite(v: Vinyle, qte: number) {
    const item = this.items.find(i => i.vinyle.id_vinyles === v.id_vinyles);
    if (!item) return;

    item.qte = qte;
    this.subject.next(this.items);
  }

  retirer(v: Vinyle) {
    this.items = this.items.filter(i => i.vinyle.id_vinyles !== v.id_vinyles);
    this.subject.next(this.items);
  }

  viderPanier() {
    this.items = [];
    this.subject.next(this.items);
  }
}
