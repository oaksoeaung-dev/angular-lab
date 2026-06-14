import { LucideIcon, LucideIconInput } from '@lucide/angular';

export interface MenuNode {
  name: string;
  icon: LucideIcon;
  routerLink?: string;
  children?: MenuNode[];
}
