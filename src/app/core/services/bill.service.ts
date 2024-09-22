import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENVIRONMENT } from '@environment/environment';
import { BillCreate } from '@models/bill-create.model';
import { Bill } from '@models/bill.model';
import { Payment } from '@models/payment.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BillService {
  private url = `${ENVIRONMENT.apiUrl}/bills`;

  constructor(private http: HttpClient) {}

  getBillOpened() {
    return this.http.get<Bill[]>(`${this.url}/getBillOpened`);
  }

  getBillById(id: number) {
    return this.http.get(`${this.url}/${id}`);
  }

  openBill(bill: BillCreate) {
    return this.http.post(`${this.url}/open`, bill);
  }

  payBill(payment: Payment) {
    return this.http.post(`${this.url}/toPay`, payment);
  }

  cancelBill(billId: number) {
    return this.http.post(`${this.url}/toCancel`, billId);
  }

  countByStatusOpen(): Observable<number> {
    return this.http.get<number>(`${this.url}/countByStatusOpen`);
  }

  countByStatusPaid(): Observable<number> {
    return this.http.get<number>(`${this.url}/countByStatusPaid`);
  }
}
