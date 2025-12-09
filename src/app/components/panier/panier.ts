import { Component, OnInit, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanierService } from '../../services/panier.service'; 
import { Vinyle } from '../catalogue/catalogue'; 
import { RouterModule } from '@angular/router'; 
import { PanierItem } from '../../panier-item';

@Component({
  selector: 'app-panier',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './panier.html',
})
export class PanierComponent implements OnInit {

  items: PanierItem[] = []

  constructor(private panierService: PanierService) {
    this.items = panierService.recupererPanier()
  }

  ngOnInit() {
    this.panierService.panier$.subscribe(items => {
      this.items = items;
    });
    console.log(this.items);
    
  }

  incrementer(item: PanierItem) {
    if (item.qte + 1 <= item.vinyle.stock){
      this.panierService.changerQuantite(item.vinyle, item.qte + 1);
    }
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
      (sum, item) => sum + item.vinyle.prixVinyle * item.qte,
      0
    );
  }
}
