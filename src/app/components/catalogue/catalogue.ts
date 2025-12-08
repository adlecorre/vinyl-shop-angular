import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Vinyle {
  artiste_id: number;
  id_vinyles: number;
  prix_vinyle: number;
  stock: number;
  titre: string;
  description: string;
  url_pochette: string;
}

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.html',
  styleUrls: ['./catalogue.css'],
  standalone: true,
  imports: [CommonModule]
})
export class CatalogueComponent {
  vinyles: Vinyle[] = [
    {
      artiste_id: 1,
      id_vinyles: 1,
      prix_vinyle: 29.99,
      stock: 10,
      titre: 'Abbey Road',
      description: 'Album classique des Beatles',
      url_pochette: 'https://upload.wikimedia.org/wikipedia/en/4/42/Beatles_-_Abbey_Road.jpg'
    },
    {
      artiste_id: 2,
      id_vinyles: 2,
      prix_vinyle: 35.5,
      stock: 5,
      titre: 'The Dark Side of the Moon',
      description: 'Album emblématique de Pink Floyd',
      url_pochette: 'dark_side_moon.jpg'
    },
    {
      artiste_id: 3,
      id_vinyles: 3,
      prix_vinyle: 40,
      stock: 7,
      titre: 'Random Access Memories',
      description: 'Album de Daft Punk',
      url_pochette: 'ram.jpg'
    },
    {
      artiste_id: 4,
      id_vinyles: 4,
      prix_vinyle: 32,
      stock: 8,
      titre: '25',
      description: 'Album d’Adele',
      url_pochette: 'adele_25.jpg'
    },
    {
      artiste_id: 6,
      id_vinyles: 5,
      prix_vinyle: 24.99,
      stock: 30,
      titre: 'Racine Carrée',
      description:
        "Album emblématique de Stromae avec des hits comme 'Formidable' et 'Papaoutai'.",
      url_pochette: 'https://exemple.com/racine-carree.jpg'
    }
  ];
}
