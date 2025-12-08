import { Routes } from '@angular/router';
import { CatalogueComponent } from './components/catalogue/catalogue';
import { PanierComponent } from './components/panier/panier';

export const routes: Routes = [
    { path: 'catalogue', component: CatalogueComponent },
    { path: 'panier', component: PanierComponent }
];
