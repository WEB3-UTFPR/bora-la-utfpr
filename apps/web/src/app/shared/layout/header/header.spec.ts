import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Header } from './header';

describe('Header', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Header],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should render header with brand and navigation', () => {
    const fixture = TestBed.createComponent(Header);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    const header = compiled.querySelector('header');
    expect(header).toBeTruthy();

    const brand = compiled.querySelector('.app-brand');
    expect(brand?.textContent?.trim()).toBe('Bora Lá');

    const navigation = compiled.querySelector('app-navigation');
    expect(navigation).toBeTruthy();
  });

  it('should render a hamburger button with aria-label "Abrir menu"', () => {
    const fixture = TestBed.createComponent(Header);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    const btn = compiled.querySelector('button[aria-label="Abrir menu"]');
    expect(btn).toBeTruthy();
  });

  it('should emit openMenu when hamburger button is clicked', () => {
    const fixture = TestBed.createComponent(Header);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    let emitted = false;
    fixture.componentInstance.openMenu.subscribe(() => {
      emitted = true;
    });

    const btn = compiled.querySelector('button[aria-label="Abrir menu"]') as HTMLButtonElement;
    btn.click();
    fixture.detectChanges();

    expect(emitted).toBe(true);
  });

  it('should set aria-expanded on hamburger button according to menuOpen input', () => {
    const fixture = TestBed.createComponent(Header);
    fixture.componentRef.setInput('menuOpen', false);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    const btn = compiled.querySelector('button[aria-label="Abrir menu"]') as HTMLButtonElement;
    expect(btn.getAttribute('aria-expanded')).toBe('false');

    fixture.componentRef.setInput('menuOpen', true);
    fixture.detectChanges();
    expect(btn.getAttribute('aria-expanded')).toBe('true');
  });

  it('should have aria-controls on hamburger button pointing to the drawer', () => {
    const fixture = TestBed.createComponent(Header);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    const btn = compiled.querySelector('button[aria-label="Abrir menu"]') as HTMLButtonElement;
    expect(btn.getAttribute('aria-controls')).toBeTruthy();
  });
});
