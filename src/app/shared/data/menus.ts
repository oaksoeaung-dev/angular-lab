import { MenuNode } from '../models/menu-node.model';
import { LucideLibrary, LucideNotepadText, LucideRadioTower } from '@lucide/angular';

export const MENUS: MenuNode[] = [
  {
    name: 'Learn',
    icon: LucideLibrary,
    children: [
      {
        name: 'Signal',
        icon: LucideRadioTower,
        children: [
          {
            name: 'Writable Signal',
            icon: LucideNotepadText,
            routerLink: 'learn/signal/writable-signal',
          },
          {
            name: 'Computed Signal',
            icon: LucideNotepadText,
            routerLink: 'learn/signal/computed-signal',
          },
        ],
      },
    ],
  },
];
