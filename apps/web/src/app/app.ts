import { Component, signal } from '@angular/core';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-root',
  imports: [Button],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('Tema do projeto');
}
