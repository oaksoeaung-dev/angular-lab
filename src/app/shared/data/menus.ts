import { MenuNode } from '../models/menu-node.model';
import {
  LucideFilePlusCorner,
  LucideForm,
  LucideLibrary,
  LucideNotepadText,
  LucideRadioTower,
} from '@lucide/angular';

export const MENUS: MenuNode[] = [
  {
    name: 'Learn',
    icon: LucideLibrary,
    color: 'rose',
    children: [
      {
        name: 'Signal',
        icon: LucideRadioTower,
        color: 'rose',
        children: [
          {
            name: 'Writable Signal',
            icon: LucideNotepadText,
            color: 'rose',
            routerLink: 'learn/signal/writable-signal',
          },
          {
            name: 'Computed Signal',
            icon: LucideNotepadText,
            color: 'rose',
            routerLink: 'learn/signal/computed-signal',
          },
        ],
      },
    ],
  },
  {
    name: 'Formly',
    icon: LucideForm,
    color: 'sky',
    children: [
      {
        name: 'Create Form',
        icon: LucideFilePlusCorner,
        color: 'sky',
        routerLink: 'formly/create-form',
      },
    ],
  },
];
