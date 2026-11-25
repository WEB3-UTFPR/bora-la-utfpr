import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { App } from './app';
import { routes } from './app.routes';

describe('App navigation and layout (AppShell)', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes)],
    }).compileComponents();
  });

  it('renders a single header, main area, and footer in order when accessing /auth/sign-up directly (CA14)', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/auth/sign-up');

    const rootElement = harness.fixture.nativeElement as HTMLElement;
    const header = rootElement.querySelector('header');
    const main = rootElement.querySelector('main');
    const footer = rootElement.querySelector('footer');

    expect(header).toBeTruthy();
    expect(main).toBeTruthy();
    expect(footer).toBeTruthy();

    expect(rootElement.querySelectorAll('header').length).toBe(1);
    expect(rootElement.querySelectorAll('main').length).toBe(1);
    expect(rootElement.querySelectorAll('footer').length).toBe(1);

    // Verify DOM order: header precedes main, main precedes footer
    const elementsInDomOrder = [...rootElement.querySelectorAll('header, main, footer')];
    expect(elementsInDomOrder[0]).toBe(header);
    expect(elementsInDomOrder[1]).toBe(main);
    expect(elementsInDomOrder[2]).toBe(footer);

    // Verify content inside main identifies the sign-up destination
    expect(main?.textContent).toContain('Criar conta');
  });

  it('renders a single header, main area, and footer in order when accessing /auth/confirm-email directly (CA14)', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/auth/confirm-email');

    const rootElement = harness.fixture.nativeElement as HTMLElement;
    const header = rootElement.querySelector('header');
    const main = rootElement.querySelector('main');
    const footer = rootElement.querySelector('footer');

    expect(header).toBeTruthy();
    expect(main).toBeTruthy();
    expect(footer).toBeTruthy();

    const elementsInDomOrder = [...rootElement.querySelectorAll('header, main, footer')];
    expect(elementsInDomOrder[0]).toBe(header);
    expect(elementsInDomOrder[1]).toBe(main);
    expect(elementsInDomOrder[2]).toBe(footer);

    expect(main?.textContent).toContain('Confirmar e-mail');
  });

  it('navigates from confirmation to sign-up when clicking "Criar conta", updates URL and content, indicates active route, and preserves AppShell instance (CA14, CA15)', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/auth/confirm-email');
    const router = TestBed.inject(Router);

    const rootElement = harness.fixture.nativeElement as HTMLElement;
    const initialShell = rootElement.querySelector('app-shell');
    expect(initialShell).toBeTruthy();

    // Verify nav links only have available features ("Criar conta")
    const navLinks = [...rootElement.querySelectorAll<HTMLAnchorElement>('nav a')];
    expect(navLinks.length).toBe(1);
    expect(navLinks[0].textContent?.trim()).toBe('Criar conta');
    expect(navLinks[0].getAttribute('href')).toBe('/auth/sign-up');

    // On /auth/confirm-email, sign-up link should not be active
    expect(navLinks[0].getAttribute('aria-current')).toBeNull();
    expect(navLinks[0].classList.contains('active')).toBe(false);

    // Click "Criar conta"
    navLinks[0].click();
    await harness.fixture.whenStable();

    // URL should update to /auth/sign-up
    expect(router.url).toBe('/auth/sign-up');

    // Main content should update to sign-up
    const main = rootElement.querySelector('main');
    expect(main?.textContent).toContain('Criar conta');

    // Sign-up link should now indicate active route
    const updatedNavLink = rootElement.querySelector<HTMLAnchorElement>('nav a');
    expect(updatedNavLink?.getAttribute('aria-current')).toBe('page');
    expect(updatedNavLink?.classList.contains('active')).toBe(true);

    // AppShell instance must be preserved
    const currentShell = rootElement.querySelector('app-shell');
    expect(currentShell).toBe(initialShell);
  });
});
