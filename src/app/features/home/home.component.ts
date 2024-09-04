import { Component } from '@angular/core';
import { MaterialUiModule } from '@material-ui/material-ui.module';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MaterialUiModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
