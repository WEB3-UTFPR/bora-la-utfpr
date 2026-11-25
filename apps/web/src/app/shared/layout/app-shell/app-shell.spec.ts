import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AppShell } from './app-shell';
import { Component } from '@angular/core';

@Component({
  selector: 'app-fake-sign-up',
  template: '<p>Criar conta page</p>',
})
class FakeSignUp {}

@Component({
  selector: 'app-fake-confirm',
  template: '<p>Confirmar e-mail</p>',
})
class FakeConfirmEmail {}

describe('AppShell — Drawer (CA16/CA17)', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppShell],
      providers: [
        provideRouter([
          { path: 'auth/sign-up', component: FakeSignUp },
          { path: 'auth/confirm-email', component: FakeConfirmEmail },
        ]),
      ],
    }).compileComponents();
  });

  it('should start with drawer closed', () => {
    const fixture = TestBed.createComponent(AppShell);
    fixture.detectChanges();

    expect(fixture.componentInstance.drawerOpen()).toBe(false);
  });

  it('should open drawer when header emits openMenu', () => {
    const fixture = TestBed.createComponent(AppShell);
    fixture.detectChanges();

    expect(fixture.componentInstance.drawerOpen()).toBe(false);

    const headerEl = fixture.nativeElement.querySelector('app-header') as HTMLElement;
    const btn = headerEl?.querySelector('button[aria-label="Abrir menu"]') as HTMLButtonElement;
    btn?.click();
    fixture.detectChanges();

    expect(fixture.componentInstance.drawerOpen()).toBe(true);
  });

  it('should close drawer when navigation emits linkSelected', () => {
    const fixture = TestBed.createComponent(AppShell);
    fixture.detectChanges();

    fixture.componentInstance.drawerOpen.set(true);
    fixture.detectChanges();
    expect(fixture.componentInstance.drawerOpen()).toBe(true);

    fixture.componentInstance.onNavigationSelected();
    fixture.detectChanges();

    expect(fixture.componentInstance.drawerOpen()).toBe(false);
  });

  it('should close drawer when drawerOpen is synced on Drawer hide event', () => {
    const fixture = TestBed.createComponent(AppShell);
    fixture.detectChanges();

    fixture.componentInstance.drawerOpen.set(true);
    fixture.detectChanges();

    fixture.componentInstance.onDrawerHide();
    fixture.detectChanges();

    expect(fixture.componentInstance.drawerOpen()).toBe(false);
  });

  it('should set aria-expanded on header button matching drawerOpen state', () => {
    const fixture = TestBed.createComponent(AppShell);
    fixture.detectChanges();

    const btn = fixture.nativeElement.querySelector(
      'button[aria-label="Abrir menu"]',
    ) as HTMLButtonElement;
    expect(btn).toBeTruthy();
    expect(btn.getAttribute('aria-expanded')).toBe('false');

    fixture.componentInstance.drawerOpen.set(true);
    fixture.detectChanges();
    expect(btn.getAttribute('aria-expanded')).toBe('true');
  });

  it('should close drawer when navigation link is selected (CA17)', () => {
    const fixture = TestBed.createComponent(AppShell);
    fixture.detectChanges();

    fixture.componentInstance.drawerOpen.set(true);
    fixture.detectChanges();

    fixture.componentInstance.onNavigationSelected();
    fixture.detectChanges();

    expect(fixture.componentInstance.drawerOpen()).toBe(false);
  });

  it('should close drawer even when already at current URL (CA17 idempotent)', () => {
    const fixture = TestBed.createComponent(AppShell);
    fixture.detectChanges();

    fixture.componentInstance.drawerOpen.set(true);
    fixture.detectChanges();
    expect(fixture.componentInstance.drawerOpen()).toBe(true);

    // clicking link when already at that URL: navigation doesn't change route
    // but onNavigationSelected still fires and drawer closes
    fixture.componentInstance.onNavigationSelected();
    fixture.detectChanges();
    expect(fixture.componentInstance.drawerOpen()).toBe(false);

    // calling again when already closed is safe
    fixture.componentInstance.onNavigationSelected();
    fixture.detectChanges();
    expect(fixture.componentInstance.drawerOpen()).toBe(false);
  });

  it('should render header, main with router-outlet, and footer in sequence', () => {
    const fixture = TestBed.createComponent(AppShell);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    const header = compiled.querySelector('app-header');
    const main = compiled.querySelector('main');
    const footer = compiled.querySelector('app-footer');

    expect(header).toBeTruthy();
    expect(main).toBeTruthy();
    expect(footer).toBeTruthy();

    const children = Array.from(compiled.querySelectorAll('app-header, main, app-footer'));
    expect(children[0]).toBe(header);
    expect(children[1]).toBe(main);
    expect(children[2]).toBe(footer);

    expect(main?.querySelector('router-outlet')).toBeTruthy();
  });
});
