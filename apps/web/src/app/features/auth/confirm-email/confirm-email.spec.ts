import { TestBed } from '@angular/core/testing';
import { ConfirmEmail } from './confirm-email';

describe('ConfirmEmail', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmEmail],
    }).compileComponents();
  });

  it('should render page identifying destination as "Confirmar e-mail"', () => {
    const fixture = TestBed.createComponent(ConfirmEmail);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    const heading = compiled.querySelector('h1');
    expect(heading).toBeTruthy();
    expect(heading?.textContent?.trim()).toBe('Confirmar e-mail');
  });
});
