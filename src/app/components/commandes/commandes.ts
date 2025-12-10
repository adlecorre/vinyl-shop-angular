import { Component, OnInit, signal, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Commande } from '../../models/commande';
import { CommonModule } from '@angular/common';
import { CommandeService } from '../../services/commande';
import { UserService } from '../../services/user';
import { User } from '../../models/user';
import { LigneCommande } from '../../models/ligne-commande';
import { LigneCommandeService } from '../../services/ligne-commande';
import { VinyleService } from '../../services/vinyle';
import { Vinyle } from '../catalogue/catalogue';

@Component({
  selector: 'app-commandes',
  imports: [RouterLink, CommonModule],
  templateUrl: './commandes.html',
  styleUrl: './commandes.css',
})
export class CommandesComponent implements OnInit{
  commandes = signal<Commande[]>([])
  lignes: { [commandeId: number]: LigneCommande[] } = {};
  vinyles: Record<number, Vinyle> = {};
  user: User | null = null

  constructor(
    private commandeService: CommandeService,
    private userService: UserService,
    private ligneService: LigneCommandeService,
    private vinyleService: VinyleService){}

  recupererLigneDeCommande(commandeId: number) {
    this.ligneService.findAllByCommandeId(commandeId).subscribe(items => {
      this.lignes[commandeId] = items;
    });
  }

  recupererVinyle(vinyleId: number) {
    if (!this.vinyles[vinyleId]) {
      this.vinyleService.findById(vinyleId).subscribe(v => {
        this.vinyles[vinyleId] = v;
      });
    }
  }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe({
      next: (currentUser) => {
        this.user = currentUser
        this.commandeService.findAllByUser(this.user?.id!).subscribe(commandes => {
          this.commandes.set(commandes)
          this.commandes().forEach(c => {
            this.recupererLigneDeCommande(c.idCommande!)
          });
        });
        
      },
      error: (err) => console.error('Erreur récupération utilisateur :', err)
    });
  }

  calculerTotal(commandeId: number){
    let total = 0
  }
  
}
