import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-default',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './default.component.html',
  styleUrl: './default.component.scss'
})
export class DefaultComponent {

}
