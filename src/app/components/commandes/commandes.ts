import { Component } from '@angular/core';
import { PanierItem } from '../../panier-item';
import { RouterLink } from '@angular/router';
import { LigneCommande } from '../../models/ligne-commande';

@Component({
  selector: 'app-commandes',
  imports: [RouterLink],
  templateUrl: './commandes.html',
  styleUrl: './commandes.css',
})
export class CommandesComponent {
  commandes: LigneCommande[] = []

  
}
