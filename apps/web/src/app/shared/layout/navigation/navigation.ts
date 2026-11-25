import { Component, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navigation',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navigation.html',
})
export class Navigation {
  readonly linkSelected = output<void>();

  onLinkClick(): void {
    this.linkSelected.emit();
  }
}
