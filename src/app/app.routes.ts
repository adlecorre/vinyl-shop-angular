import { Routes } from '@angular/router';
import { ConnexionComponent } from './components/connexion/connexion';
import { InscriptionComponent } from './components/inscription/inscription';

export const routes: Routes = [
    {path: 'connexion', component: ConnexionComponent},
    {path: 'inscription', component: InscriptionComponent}
];
