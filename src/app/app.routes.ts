import { Routes } from '@angular/router';
import { CatalogueComponent } from './components/catalogue/catalogue';
import { PanierComponent } from './components/panier/panier';
import { ConnexionComponent } from './components/connexion/connexion';
import { InscriptionComponent } from './components/inscription/inscription';
import { ProfilComponent } from './components/profil/profil';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
    { path: 'connexion', component: ConnexionComponent},
    { path: 'inscription', component: InscriptionComponent},
    { path: 'catalogue', component: CatalogueComponent, canActivate: [authGuard]},
    { path: 'profil', component: ProfilComponent, canActivate: [authGuard]},
    { path: 'panier', component: PanierComponent, canActivate: [authGuard]}
];
