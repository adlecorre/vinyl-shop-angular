import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogueService } from '../../services/catalogue';
import { FormsModule } from '@angular/forms';
import { PanierService } from '../../services/panier.service';
import { Subscription, Subject, debounceTime } from 'rxjs';
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
  imports: [CommonModule, FormsModule, RouterModule]
})

export class CatalogueComponent implements OnInit {

  vinyles = signal<Vinyle[]>([]);
  erreur = signal<string | null>(null);
  titre = '';

  private vinylesOriginaux: Vinyle[] = [];

  count = 0;

  private rechercheSubject = new Subject<string>();

  private panierService = inject(PanierService);
  private cs = inject(CatalogueService);

  private subscription!: Subscription;
  private rechercheSub!: Subscription;

  ngOnInit(): void {

  // Panier
  this.subscription = this.panierService.panier$.subscribe(items => {
    this.count = items.length;

    // Mettre à jour les quantités des vinyles affichés
    this.vinyles.update(currentVinyles => 
      currentVinyles.map(v => {
        const item = items.find(i => i.vinyle.idVinyle === v.idVinyle);
        return { ...v, quantite: item ? item.qte : 0 };
      })
    );
  });

  // Charger tous les vinyles
  this.cs.findAll().subscribe({
    next: (res) => {
      // synchroniser avec le panier existant
      const panier = this.panierService.recupererPanier();
      this.vinylesOriginaux = res.map(v => {
        const item = panier.find(i => i.vinyle.idVinyle === v.idVinyle);
        return { ...v, quantite: item ? item.qte : 0 };
      });
      this.vinyles.set(this.vinylesOriginaux);
    },
    error: () => {
      this.erreur.set("Problème de récupération des données.");
    }
  });

  // Débounce de 300ms pour la recherche
  this.rechercheSub = this.rechercheSubject
    .pipe(debounceTime(300))
    .subscribe(term => {
      this.filtrerCatalogue(term);
    });
}


  chercher() {
    this.rechercheSubject.next(this.titre);
  }

  private filtrerCatalogue(searchTerm: string) {
    searchTerm = searchTerm.toLowerCase();
    this.vinyles.set(
      this.vinylesOriginaux.filter(v => v.titre.toLowerCase().includes(searchTerm))
    );
  }

  ajouterAuPanier(v: Vinyle) {
    if (!v.quantite) v.quantite = 0;
    v.quantite++;
    this.panierService.ajouter(v);
  }

  retirerDuPanier(vinyle: Vinyle) {
  if (!vinyle.quantite || vinyle.quantite <= 0) return;

  vinyle.quantite--; // décrémente l'affichage
  this.panierService.retirerUn(vinyle); // décrémente dans le panier
}


  panierContientVinyle(v: Vinyle) {
    return this.panierService.contientVinyle(v);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.rechercheSub.unsubscribe();
  }

  trackById(index: number, vinyle: Vinyle) {
    return vinyle.idVinyle;
  }

  

}
