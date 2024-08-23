import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENVIRONMENT } from '@environment/environment';
import { OrderItemsWrapper } from '@models/order-item-wrapper.model';
import { Order } from '@models/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private url = `${ENVIRONMENT.apiUrl}/orders`;

  constructor(private http: HttpClient) {}

  getAllOrders() {
    return this.http.get<Order[]>(`${this.url}`);
  }

  createOrder() {
    return this.http.post<Order>(`${this.url}`, undefined);
  }

  addProductToOrder(data: OrderItemsWrapper){
    return this.http.put(`${this.url}`, data);
  }

  deleteOrder(orderId: number){
    return this.http.delete(`${this.url}/${orderId}`)
  }

  deleteProductFromOrder(orderId: number,productId: number ){
    return this.http.delete(`${this.url}/order/${orderId}/product/${productId}`)
  }
}
