import { Component, OnInit, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanierService } from '../../services/panier.service'; 
import { Vinyle } from '../catalogue/catalogue'; 
import { RouterModule } from '@angular/router'; 
import { PanierItem } from '../../panier-item';
import { CommandeService } from '../../services/commande';
import { Commande } from '../../models/commande';
import { LigneCommande } from '../../models/ligne-commande';
import { LigneCommandeService } from '../../services/ligne-commande';

@Component({
  selector: 'app-panier',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './panier.html',
})
export class PanierComponent implements OnInit {

  items: PanierItem[] = []
  commande: Commande | null = null
  lignesCommande: LigneCommande[] = []

  constructor(private panierService: PanierService,  private commandeService: CommandeService, private ligneService: LigneCommandeService) {
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

  commander(){
    // Construction de la commande à l'aide des lignes de commande
    this.items.forEach(item => {
      const ligneCommande = {quantite: item.qte, commande: this.commande, vinyle: item.vinyle}
      this.ligneService.save(ligneCommande)
    });

    // Création de la commande

    // Vide le panier
    this.vider()

  }
}
