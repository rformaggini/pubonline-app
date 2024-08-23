import { AfterContentChecked, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MaterialUiModule } from '@material-ui/material-ui.module';
import { OrderItems } from '@models/order-item.model';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [MaterialUiModule],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss',
})
export class OrderDetailsComponent implements OnInit, AfterContentChecked{
  @Input() orderItems!: OrderItems[];
  @Output("deleteProduct") deleteProductEmitter = new EventEmitter()

  displayedColumns: string[] = ['name', 'quantity','subtotal', 'actions'];
  dataSource = new MatTableDataSource<OrderItems>();

  constructor(){  }

  ngOnInit(): void {
    this.getTableData();
  }
  
  ngAfterContentChecked(): void {
    this.getTableData();
  }
  
  getTableData(){
    this.dataSource = new MatTableDataSource(this.orderItems);
  }

  deleteProductHandler(value: OrderItems){
    this.deleteProductEmitter.emit(value);
  }
}
