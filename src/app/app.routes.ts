import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'learn',
    loadComponent: () => import('./features/learn/learn').then((c) => c.Learn),
    loadChildren: () => import('./features/learn/learn.routes').then((r) => r.routes),
  },
  {
    path: 'formly',
    loadComponent: () => import('./features/formly/formly').then((c) => c.Formly),
    loadChildren: () => import('./features/formly/formly.routes').then((r) => r.routes),
  },
];
