import { MenuNode } from '../models/menu-node.model';
import {
  LucideFilePlusCorner,
  LucideFlaskConical,
  LucideForm,
  LucideLibrary,
  LucideNotepadText,
  LucideRadioTower,
  LucideTestTube,
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
          {
            name: 'Effect Signal',
            icon: LucideNotepadText,
            color: 'rose',
            routerLink: 'learn/signal/effect-signal',
          },
          {
            name: 'Linked Signal',
            icon: LucideNotepadText,
            color: 'rose',
            routerLink: 'learn/signal/linked-signal',
          },
          {
            name: 'Signal Base Service',
            icon: LucideNotepadText,
            color: 'rose',
            routerLink: 'learn/signal/signal-base-service',
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
      {
        name: 'View Form',
        icon: LucideFilePlusCorner,
        color: 'sky',
        routerLink: 'formly/view-form',
      },
    ],
  },
  {
    name: 'Test',
    icon: LucideFlaskConical,
    color: 'blue',
    routerLink: 'test',
  },
];
