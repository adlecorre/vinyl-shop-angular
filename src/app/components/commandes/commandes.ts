import { Component } from '@angular/core';
import { PanierItem } from '../../panier-item';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-commandes',
  imports: [RouterLink],
  templateUrl: './commandes.html',
  styleUrl: './commandes.css',
})
export class CommandesComponent {
  commandes: PanierItem[] = []
}
