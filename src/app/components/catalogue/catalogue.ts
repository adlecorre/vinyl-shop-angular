import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogueService } from '../../services/catalogue';
import { FormsModule } from '@angular/forms';
import { PanierService } from '../../services/panier.service';
import { Subscription } from 'rxjs';
import { RouterModule } from '@angular/router'; 

export interface Vinyle {
  artiste_id: number;
  prixVinyle: number;
  stock: number;
  titre: string;
  description: string;
  urlPochette: string;
}

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.html',
  styleUrls: ['./catalogue.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
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

  ajouterAuPanier(vinyle: Vinyle) {
    this.panierService.ajouter(vinyle);
  }
retirerDuPanier(vinyle: Vinyle) {
  this.panierService.retirer(vinyle);

  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
