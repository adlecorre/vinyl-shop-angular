import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth';
import { InscriptionService } from '../../services/inscription';

@Component({
  selector: 'app-inscription',
  imports: [FormsModule, RouterModule],
  templateUrl: './inscription.html',
  styleUrl: './inscription.css',
})
export class InscriptionComponent {
  erreur= signal<string | null>(null)
  user: User = {
    email: '',
    motDePasse: '',
    role: 'CLIENT' // par défaut
  }

  constructor(
    private router: Router,
    private inscriptionService: InscriptionService
  ){}

  inscription(){
    this.inscriptionService.addUser(this.user).subscribe({
      next: () => {
        this.erreur.set(null)
        this.router.navigateByUrl('/connexion')
      },
      error: (err) => {
        console.log(err);
        if(err.error){
          this.erreur.set(err.error)
        } else {
          this.erreur.set("Inscription impossible")
        }
      }
    })
  }
}
