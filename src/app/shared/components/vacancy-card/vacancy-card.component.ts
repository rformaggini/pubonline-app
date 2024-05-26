import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-vacancy-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './vacancy-card.component.html',
  styleUrl: './vacancy-card.component.scss'
})
export class VacancyCardComponent {
   
}
