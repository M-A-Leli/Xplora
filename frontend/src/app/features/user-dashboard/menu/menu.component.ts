import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  @Input() isOpen = false;
  @Output() closeMenu = new EventEmitter<void>();

  constructor(private router: Router) {}

  close(event: MouseEvent) {
    event.stopPropagation();  // Stop the click event from propagating
    this.closeMenu.emit();
  }

  navigateTo(route: string, event: MouseEvent) {
    event.stopPropagation();  // Stop the click event from propagating
    this.router.navigateByUrl(route).then(() => {
      this.close(event);
    });
  }
}
