import { Component, signal } from '@angular/core';
import { User } from '../../models/user';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { LoginLogoutService } from '../../services/login-logout';

@Component({
  selector: 'app-connexion',
  imports: [FormsModule, RouterModule],
  templateUrl: './connexion.html',
  styleUrl: './connexion.css',
})
export class ConnexionComponent {
  erreur= signal<string | null>(null)
  user: User = {
    email: '',
    motDePasse: '',
    role: 'CLIENT' // par défaut
  }

  constructor(
    private router: Router,
    private authService: AuthService,
    private logService: LoginLogoutService
  ){}

  connexion(){
    this.authService.findUserByUsernameAndPassword(this.user).subscribe({
      next: (res) => {
        console.log(res);
        localStorage.setItem('tokens', JSON.stringify(res))
        localStorage.setItem('user', JSON.stringify(this.user))
        this.erreur.set(null)
        this.logService.isConnected(true)
        this.router.navigateByUrl('/catalogue')
      },
      error: (err) => {
        console.log(err);
        this.erreur.set("Identifiants incorrects.")
      }
    })
  }


}
