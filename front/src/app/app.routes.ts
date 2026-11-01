import { Routes } from '@angular/router';
import { HomePage } from './pages/home/home.page';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'home', title: 'Home', component: HomePage },

  {
    path: 'ubicacion',
    title: 'Ubicación',
    loadComponent: () => import('./pages/ubicacion/ubicacion.page'),
  },

  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found.page'),
  },
];
