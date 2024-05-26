import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxUiLoaderModule } from 'ngx-ui-loader';

@Component({
  selector: 'app-default',
  standalone: true,
  imports: [RouterOutlet, NgxUiLoaderModule],
  templateUrl: './default.component.html',
  styleUrl: './default.component.scss'
})
export class DefaultComponent {

}
