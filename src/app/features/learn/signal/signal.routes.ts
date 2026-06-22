import { Route } from '@angular/router';

export const routes: Route[] = [
  {
    path: 'writable-signal',
    loadComponent: () => import('./writable-signal/writable-signal').then((c) => c.WritableSignal),
  },
  {
    path: 'computed-signal',
    loadComponent: () => import('./computed-signal/computed-signal').then((c) => c.ComputedSignal),
  },
  {
    path: 'effect-signal',
    loadComponent: () => import('./effect-signal/effect-signal').then((c) => c.EffectSignal),
  },
  {
    path: 'linked-signal',
    loadComponent: () => import('./linked-signal/linked-signal').then((c) => c.LinkedSignal),
  },
];
