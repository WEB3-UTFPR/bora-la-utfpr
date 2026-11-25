import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AppShell } from './app-shell';

describe('AppShell', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppShell],
      providers: [provideRouter([])],
    }).compileComponents();
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
