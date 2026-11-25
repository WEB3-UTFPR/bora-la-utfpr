import { TestBed } from '@angular/core/testing';
import { SignUp } from './sign-up';

describe('SignUp', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignUp],
    }).compileComponents();
  });

  it('should render page identifying destination as "Criar conta"', () => {
    const fixture = TestBed.createComponent(SignUp);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    const heading = compiled.querySelector('h1');
    expect(heading).toBeTruthy();
    expect(heading?.textContent?.trim()).toBe('Criar conta');
  });
});
