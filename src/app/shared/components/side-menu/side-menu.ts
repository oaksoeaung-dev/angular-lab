import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeModule } from '@angular/material/tree';
import { MatButtonModule } from '@angular/material/button';
import { LucideDynamicIcon } from '@lucide/angular';
import { MatRipple } from '@angular/material/core';
import { MenuNode } from '../../models/menu-node.model';
import { MENUS } from '../../data/menus';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-side-menu',
  imports: [
    MatTreeModule,
    MatButtonModule,
    MatIconModule,
    MatRipple,
    LucideDynamicIcon,
    RouterLink,
  ],
  templateUrl: './side-menu.html',
  styleUrl: './side-menu.css',
})
export class SideMenu {
  dataSource = MENUS;

  childrenAccessor = (node: MenuNode) => node.children ?? [];

  hasChild = (_: number, node: MenuNode) => !!node.children && node.children.length > 0;
}
