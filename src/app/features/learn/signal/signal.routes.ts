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
  {
    path: 'signal-base-service',
    loadComponent: () =>
      import('./signal-base-service/signal-base-service').then((c) => c.SignalBaseService),
  },
  {
    path: 'resource-signal',
    loadComponent: () => import('./resource-signal/resource-signal').then((c) => c.ResourceSignal),
  },
];
