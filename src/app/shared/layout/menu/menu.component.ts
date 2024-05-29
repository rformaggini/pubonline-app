import { Component, Input, OnInit, computed, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { Role } from '@enums/role';
import { MenuItem } from '@models/menu-item.model';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MatIconModule, MatListModule, RouterModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent implements OnInit{
  menuCollapsed = signal(false);
  private payLoad = { scope: '' };
  isItemMenuAllowed = (role: string) => role == this.payLoad.scope;
 

  @Input() set collapsed(val: boolean) {
    this.menuCollapsed.set(val);
  }

  profilePictureSize = computed(() => (this.menuCollapsed() ? '32' : '100'));

  menuItems = signal<MenuItem[]>([
    {
      icon: 'home',
      label: 'Dashboard',
      route: 'home',
      role: [Role.BASIC, Role.STAFF, Role.ADMIN],
    },
    {
      icon: 'category',
      label: 'Categories',
      route: 'category',
      role: [Role.ADMIN],
    },
    {
      icon: 'build',
      label: 'Products',
      route: 'product',
      role: [Role.ADMIN],
    },
    {
      icon: 'table_bar',
      label: 'Reservaion',
      route: 'product',
      role: [Role.ADMIN],
    },
    {
      icon: 'receipt_long',
      label: 'Bill',
      route: 'product',
      role: [Role.ADMIN],
    },
  ]);
  
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
       this.payLoad = jwtDecode(token);
    }
  }
}
