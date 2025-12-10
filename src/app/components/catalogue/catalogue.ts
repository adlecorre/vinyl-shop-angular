import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogueService } from '../../services/catalogue';
import { FormsModule } from '@angular/forms';
import { PanierService } from '../../services/panier.service';
import { Subscription } from 'rxjs';
import { RouterLink, RouterModule } from '@angular/router'; 
import { PanierItem } from '../../panier-item';

export interface Vinyle {
  idVinyle: number;
  artiste_id: number;
  prixVinyle: number;
  stock: number;
  titre: string;
  description: string;
  urlPochette: string;
    quantite?: number; 
}

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.html',
  styleUrls: ['./catalogue.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink]
})

export class CatalogueComponent implements OnInit {
  vinyles = signal<Vinyle[]>([])
  erreur = signal<string | null>(null)
  titre = ''
  count: number = 0;
  subscription!: Subscription;

  constructor(private panierService: PanierService){}

  cs = inject(CatalogueService)
  
  ngOnInit(): void {
    // S'abonner aux changements du panier
    this.subscription = this.panierService.panier$.subscribe(items => {
      this.count = items.length;
    });
    this.cs.findAll().subscribe({
      next: (res) => {
        console.log(res);
        this.vinyles.set(res)
        this.synchroniserQuantites();
      },
      error: (err) => {
        this.erreur.set("Problème de récupération des données.")
        console.log(err);
      }
    })
  }

  chercher(){
    this.cs.findByTitre(this.titre).subscribe({
      next: (res) => {
        console.log(res);
        this.vinyles.set([res])
      },
      error: (err) => {
        this.erreur.set("Problème de récupération des données.")
        console.log(err);
      }
    })
  }

  //ajouterAuPanier(vinyle: Vinyle) {this.panierService.ajouter(vinyle); }
//retirerDuPanier(vinyle: Vinyle) { this.panierService.retirer(vinyle);}
  //
 // ------------ PANIER ------------ //

  ajouterAuPanier(vinyle: Vinyle) {

    if (!vinyle.quantite) {
      vinyle.quantite = 0;
    }

    vinyle.quantite++;

    // enregistrement dans le panier global
    this.panierService.ajouter(vinyle);
  }

  retirerDuPanier(vinyle: Vinyle) {

    if (vinyle.quantite && vinyle.quantite > 0) {

      vinyle.quantite--;

      // retrait du panier global
      this.panierService.retirer(vinyle);
    }
  }

  panierContientVinyle(v: Vinyle){
    return this.panierService.contientVinyle(v)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

private synchroniserQuantites() {
  const itemsPanier = this.panierService.getPanier();

  this.vinyles.update(vinyles =>
    vinyles.map(v => {
      const item = itemsPanier.find(i => i.vinyle.idVinyle === v.idVinyle);

      return {
        ...v,
        quantite: item ? item.qte : 0
      };
    })
  );
}


}
