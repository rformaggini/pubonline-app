import { AfterContentChecked, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MaterialUiModule } from '@material-ui/material-ui.module';
import { Order } from '@models/order.model';

@Component({
  selector: 'app-brief-order',
  standalone: true,
  imports: [MaterialUiModule],
  templateUrl: './brief-order.component.html',
  styleUrl: './brief-order.component.scss'
})
export class BriefOrderComponent implements OnInit, AfterContentChecked {

  @Input() order!: Order;
  @Output('orderItems') orderItemEmitter = new EventEmitter();
  @Output('deleteOrder') deleteOrderEmitter = new EventEmitter<number>();
  totalProducts!: number;
  totalOrder!: number

  constructor(){
  }
  
  ngOnInit(): void {
    this.calcOrderSummary();
  }

  ngAfterContentChecked(): void {
    this.calcOrderSummary();
  }
  
  calcOrderSummary(){
    this.totalProducts = this.order.orderItems.reduce((previous, current) => previous + current.quantity, 0);
    this.totalOrder = this.order.orderItems.reduce((previous, current) => previous + (current.quantity*current.product.price), 0)
  }

  sendProductDetails(){
    this.orderItemEmitter.emit()
  }

  deleteOrderDetails(){
    this.deleteOrderEmitter.emit(this.order.orderId);
  }
}
