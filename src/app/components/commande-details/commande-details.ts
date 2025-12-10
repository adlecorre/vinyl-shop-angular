import { Component, input, OnInit, signal } from '@angular/core';
import { Commande } from '../../models/commande';
import { LigneCommande } from '../../models/ligne-commande';
import { LigneCommandeService } from '../../services/ligne-commande';
import { ActivatedRoute } from '@angular/router';
import { CatalogueService } from '../../services/catalogue';
import { Vinyle } from '../catalogue/catalogue';

@Component({
  selector: 'app-commande-details',
  imports: [],
  templateUrl: './commande-details.html',
  styleUrl: './commande-details.css',
})
export class CommandeDetailsComponent implements OnInit{
  commandeId!: number
  lignes = signal<LigneCommande[]>([])
  vinyles = signal<Vinyle[]>([])

  constructor(
    private ligneService: LigneCommandeService,
    private catalogueService: CatalogueService,
    private route: ActivatedRoute){}

  ngOnInit(): void {
    this.commandeId = Number(this.route.snapshot.paramMap.get('id'))
    this.ligneService.findAllByCommandeId(this.commandeId).subscribe(l => {
      this.lignes.set(l);
      this.lignes().forEach(l => {
        this.catalogueService.findById(l.idVinyle).subscribe(v => {
          this.vinyles.set([...this.vinyles(), v])
        })
      });
    });
  }

  calculerTotal(){
    let total = 0
    this.vinyles().forEach(v => {
      total += v.prixVinyle
    });
    return total
  }

}
