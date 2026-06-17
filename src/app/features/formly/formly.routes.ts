import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'create-form',
    loadComponent: () => import('./create-form/create-form').then((c) => c.CreateForm),
  },
];
