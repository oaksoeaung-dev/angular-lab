import { MenuNode } from '../models/menu-node.model';
import { LucideLibrary, LucideRadioTower } from '@lucide/angular';

export const MENUS: MenuNode[] = [
  {
    name: 'Learn',
    icon: LucideLibrary,
    children: [
      {
        name: 'Signal',
        icon: LucideRadioTower,
        routerLink: 'learn/signal',
      },
    ],
  },
];
