import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'signal',
    loadComponent: () => import('./signal/signal').then((c) => c.Signal),
    loadChildren: () => import('./signal/signal.routes').then((r) => r.routes),
  },
];
