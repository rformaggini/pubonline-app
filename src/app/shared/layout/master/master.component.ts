import { Component, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-master',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, MatSidenavModule, MenuComponent],
  templateUrl: './master.component.html',
  styleUrl: './master.component.scss'
})
export class MasterComponent {

  collapsed = signal(false);
  
  sideNavWidth = computed(() => 
    this.collapsed() ? '65px' : '250px'
  )
}
