import { Component, Input, computed, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { MenuItem } from '@models/menu-item.model';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MatIconModule, MatListModule, RouterModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {

  menuCollapsed = signal(false);

  @Input() set collapsed(val: boolean) {
    this.menuCollapsed.set(val);
  }

  profilePictureSize = computed(() => this.menuCollapsed() ? '32' : '100')
  
  menuItems = signal<MenuItem[]>([
    {
      icon: 'home',
      label: 'Dashboard',
      route: 'home',
    },
    {
      icon: 'location_city',
      label: 'My vacancies',
      route: 'vacancy',
    },
  ]);

  
}
