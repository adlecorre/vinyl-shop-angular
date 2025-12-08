import { Routes } from '@angular/router';
import { CatalogueComponent } from './components/catalogue/catalogue';
import { ConnexionComponent } from './components/connexion/connexion';
import { InscriptionComponent } from './components/inscription/inscription';

export const routes: Routes = [
    { path: 'catalogue', component: CatalogueComponent},
    { path: 'connexion', component: ConnexionComponent},
    {path: 'inscription', component: InscriptionComponent},
];
