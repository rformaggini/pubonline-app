import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENVIRONMENT } from '@environment/environment';
import { TableCreate } from '@models/table-create.model';
import { Table } from '@models/table.model';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  private url = `${ENVIRONMENT.apiUrl}/table`;

  constructor(private http: HttpClient) {}

  createTable(data: TableCreate) {
    return this.http.post(`${this.url}`, data);
  }

  getAllTables(){
    return this.http.get<Table[]>(`${this.url}`);
  }

  deleteTables(tableId: number){
    return this.http.delete(`${this.url}/${tableId}`);
  }

}
