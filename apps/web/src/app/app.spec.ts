import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should identify the disposable theme demonstration', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Tema do projeto');
  });

  it('should render the three theme demonstration buttons', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    const buttons = [...compiled.querySelectorAll('button')];

    expect(buttons.map((button) => button.textContent?.trim())).toEqual([
      'Primária',
      'Perigo',
      'Contorno',
    ]);
    expect(buttons.every((button) => button.classList.contains('p-button'))).toBe(true);
  });
});
