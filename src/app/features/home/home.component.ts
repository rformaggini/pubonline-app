import { Component } from '@angular/core';
import { VacancyCardComponent } from '../../shared/components/vacancy-card/vacancy-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [VacancyCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
