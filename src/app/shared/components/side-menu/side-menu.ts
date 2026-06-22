import { afterNextRender, Component, inject, viewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTree, MatTreeModule } from '@angular/material/tree';
import { MatButtonModule } from '@angular/material/button';
import { LucideDynamicIcon } from '@lucide/angular';
import { MatRipple } from '@angular/material/core';
import { MenuNode } from '../../models/menu-node.model';
import { MENUS } from '../../data/menus';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-side-menu',
  imports: [
    MatTreeModule,
    MatButtonModule,
    MatIconModule,
    MatRipple,
    LucideDynamicIcon,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './side-menu.html',
})
export class SideMenu {
  protected dataSource = MENUS;
  private tree = viewChild.required(MatTree<MenuNode>);
  private router = inject(Router);

  protected colorMapper: Record<string, { bg: string; stroke: string; ring: string }> = {
    rose: { bg: 'bg-rose-100', stroke: 'stroke-rose-500', ring: 'ring-rose-200' },
    sky: { bg: 'bg-sky-100', stroke: 'stroke-sky-500', ring: 'ring-sky-200' },
  };

  childrenAccessor = (node: MenuNode) => node.children ?? [];

  hasChild = (_: number, node: MenuNode) => !!node.children && node.children.length > 0;

  constructor() {
    afterNextRender(() => this.expandActivePath());

    this.router.events
      .pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => this.expandActivePath());
  }

  private expandActivePath(): void {
    if (!this.tree()) return;

    const path = this.findActivePath(this.dataSource);
    if (!path) return;

    for (const node of path) {
      this.tree().expand(node);
    }
  }

  private findActivePath(nodes: MenuNode[], trail: MenuNode[] = []): MenuNode[] | null {
    for (const node of nodes) {
      const current = [...trail, node];

      if (node.routerLink && this.isLinkActive(node.routerLink)) {
        return current;
      }
      if (node.children?.length) {
        const found = this.findActivePath(node.children, current);
        if (found) return found;
      }
    }
    return null;
  }

  private isLinkActive(link: string): boolean {
    const currentUrl = this.router.url.split(/[?#]/)[0];
    const target = link.startsWith('/') ? link : '/' + link;
    return currentUrl === target;
  }
}
