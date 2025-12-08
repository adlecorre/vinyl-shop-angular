import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogueService } from '../../services/catalogue';
import { FormsModule } from '@angular/forms';

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

  cs = inject(CatalogueService)
  
  ngOnInit(): void {
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
}
