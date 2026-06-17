import { LucideIcon, LucideIconInput } from '@lucide/angular';

export interface MenuNode {
  name: string;
  icon: LucideIcon;
  color: string;
  routerLink?: string;
  children?: MenuNode[];
}
