import { Component, input, output } from '@angular/core';
import { Navigation } from '../navigation/navigation';

@Component({
  selector: 'app-header',
  imports: [Navigation],
  templateUrl: './header.html',
})
export class Header {
  readonly menuOpen = input<boolean>(false);
  readonly openMenu = output<void>();

  onHamburgerClick(): void {
    this.openMenu.emit();
  }
}
