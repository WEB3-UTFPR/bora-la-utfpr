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
});
