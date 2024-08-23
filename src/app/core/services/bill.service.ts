import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENVIRONMENT } from '@environment/environment';
import { BillCreate } from '@models/bill-create.model';
import { Bill } from '@models/bill.model';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  private url = `${ENVIRONMENT.apiUrl}/bills`;

  constructor(private http: HttpClient) {}

  getBill(){
    return this.http.get(`${this.url}`); 
  }
  
  getBillOpened(){
    return this.http.get<Bill[]>(`${this.url}/getBillOpened`); 
  }

  getBillById(id: number){
    return this.http.get(`${this.url}/${id}`); 
  }
  
  openBill(bill : BillCreate){
    return this.http.post(`${this.url}/open`, bill);
  }


  
}
