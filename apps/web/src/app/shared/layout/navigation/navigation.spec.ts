import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Navigation } from './navigation';
import { Component } from '@angular/core';

@Component({ selector: 'app-fake-noop', template: '' })
class FakeNoop {}

describe('Navigation', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Navigation],
      providers: [provideRouter([{ path: 'auth/sign-up', component: FakeNoop }])],
    }).compileComponents();
  });

  it('should render navigation link for "Criar conta" pointing to /auth/sign-up', () => {
    const fixture = TestBed.createComponent(Navigation);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    const nav = compiled.querySelector('nav');
    expect(nav).toBeTruthy();

    const links = Array.from(compiled.querySelectorAll('a'));
    expect(links.length).toBe(1);
    expect(links[0].textContent?.trim()).toBe('Criar conta');
    expect(links[0].getAttribute('href')).toBe('/auth/sign-up');
  });

  it('should not contain links to unavailable features', () => {
    const fixture = TestBed.createComponent(Navigation);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    const links = Array.from(compiled.querySelectorAll('a'));
    const linkTexts = links.map((link) => link.textContent?.trim());
    expect(linkTexts).toEqual(['Criar conta']);
  });

  it('should emit linkSelected when onLinkClick is called', () => {
    const fixture = TestBed.createComponent(Navigation);
    fixture.detectChanges();

    let emitted = false;
    fixture.componentInstance.linkSelected.subscribe(() => {
      emitted = true;
    });

    // Call the method directly to avoid triggering RouterLink navigation
    fixture.componentInstance.onLinkClick();
    fixture.detectChanges();

    expect(emitted).toBe(true);
  });
});
