import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Drawer } from 'primeng/drawer';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { Navigation } from '../navigation/navigation';

@Component({
  selector: 'app-shell',
  imports: [Header, Footer, RouterOutlet, Drawer, Navigation],
  templateUrl: './app-shell.html',
})
export class AppShell {
  readonly drawerOpen = signal<boolean>(false);

  openDrawer(): void {
    this.drawerOpen.set(true);
  }

  onDrawerHide(): void {
    this.drawerOpen.set(false);
  }

  onNavigationSelected(): void {
    this.drawerOpen.set(false);
  }
}
