import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
  { path: 'pipe/:type', loadComponent: () => import('./pages/pipe/pipe-medium.component').then(m => m.PipeMediumComponent) },
  { path: 'pipe/:type/size/:medium', loadComponent: () => import('./pages/pipe/pipe-dimension.component').then(m => m.PipeDimensionComponent) },
  { path: 'reparatursysteme', loadComponent: () => import('./pages/reparatursysteme/reparatursysteme.component').then(m => m.ReparatursystemeComponent) },
];
