import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanierService } from '../../services/panier.service'; 
import { Vinyle } from '../catalogue/catalogue'; 
import { RouterModule } from '@angular/router'; 

interface PanierItem {
  vinyle: Vinyle;
  qte: number;
}

@Component({
  selector: 'app-panier',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './panier.html',
})
export class PanierComponent implements OnInit {
  
  items: PanierItem[] = [];

  constructor(private panierService: PanierService) {}

  ngOnInit() {
    this.panierService.panier$.subscribe(items => {
      this.items = items;
    });
  }

  incrementer(item: PanierItem) {
    this.panierService.changerQuantite(item.vinyle, item.qte + 1);
  }

  decrementer(item: PanierItem) {
    if (item.qte > 1) {
      this.panierService.changerQuantite(item.vinyle, item.qte - 1);
    } else {
      this.supprimer(item);
    }
  }

  supprimer(item: PanierItem) {
    this.panierService.retirer(item.vinyle);
  }

  vider() {
    this.panierService.viderPanier();
  }

  total() {
    return this.items.reduce(
      (sum, item) => sum + item.vinyle.prix_vinyle * item.qte,
      0
    );
  }
}
