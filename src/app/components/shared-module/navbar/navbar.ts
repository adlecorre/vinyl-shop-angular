import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Route, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs';
import { LoginLogoutService } from '../../../services/login-logout';
import { PanierService } from '../../../services/panier.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class NavbarComponent {
  currentRoute: string = '';
  logged = false;

  constructor(public logService: LoginLogoutService, private router: Router, private panierService: PanierService) {

    this.logService.getSubject().subscribe(state => {
      this.logged = state;
    });

    const user = localStorage.getItem('user');
    this.logged = !!user;

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.currentRoute = event.url;
      });
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('tokens');
    this.logService.isConnected(false);
    this.panierService.viderPanier()
    this.router.navigateByUrl('/connexion');
  }

}

