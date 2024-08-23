import { Component } from '@angular/core';
import { OnlineOrderComponent } from '@shared-components/online-order/online-order.component';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [OnlineOrderComponent, ],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent {

}
