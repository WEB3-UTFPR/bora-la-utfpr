import { TestBed } from '@angular/core/testing';
import { Footer } from './footer';

describe('Footer', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Footer],
    }).compileComponents();
  });

  it('should render footer element with copyright or app name', () => {
    const fixture = TestBed.createComponent(Footer);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    const footer = compiled.querySelector('footer');
    expect(footer).toBeTruthy();
    expect(footer?.textContent).toContain('Bora Lá UTFPR');
  });
});
