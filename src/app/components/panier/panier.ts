import { Component, OnInit, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanierService } from '../../services/panier.service'; 
import { Vinyle } from '../catalogue/catalogue'; 
import { RouterModule } from '@angular/router'; 
import { PanierItem } from '../../panier-item';
import { LigneCommandeService } from '../../services/ligne-commande';
import { CommandeService } from '../../services/commande';
import { UserService } from '../../services/user';
import { Commande } from '../../models/commande';
import { User } from '../../models/user';
import { LigneCommande } from '../../models/ligne-commande';

@Component({
  selector: 'app-panier',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './panier.html',
})
export class PanierComponent implements OnInit {

  items: PanierItem[] = []
  commande: Commande | null = null

  constructor(private panierService: PanierService, private ligneService: LigneCommandeService, private commandeService: CommandeService, private userService: UserService) {
    this.items = panierService.recupererPanier()

    this.userService.getCurrentUser().subscribe({
      next: (currentUser) => {
        console.log(currentUser)
        this.commande = {
          dateCommande: new Date(),
          statutCommande: "EN_ATTENTE",
          utilisateurId: currentUser.id!
        };
      },
      error: (err) => console.error('Erreur récupération utilisateur :', err)
    });
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

  commander() {
    if (!this.commande) {
      console.error("Commande non prête !");
      return;
    }

    this.commandeService.save(this.commande).subscribe({
      next: (commandeCree) => {
        console.log("Commande créée :", commandeCree);

        this.items.forEach(item => {
          const ligneCommande: LigneCommande = {
            idCommande: commandeCree.idCommande!,
            idVinyle: item.vinyle.idVinyle,
            quantite: item.qte
          };
          console.log("Ligne commande: " + JSON.stringify(ligneCommande));
          console.log("Item: " + item);
          
          

          this.ligneService.save(ligneCommande).subscribe({
            next: (lc) => console.log("Ligne OK :", lc),
            error: (err) => console.error("Erreur ligne :", err)
          });
        });

        // 3️⃣ vider le panier *après*
        this.vider();
      },

      error: (err) => console.error("Erreur création commande :", err)
    });

  }
}
