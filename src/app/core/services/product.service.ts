import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENVIRONMENT } from '@environment/environment';
import { ProductCreate } from '@models/product-create.model';
import { ProductUpdateStatus } from '@models/product-update-status.model';
import { ProductUpdate } from '@models/product-update.model';
import { Product } from '@models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private url = `${ENVIRONMENT.apiUrl}/products`;

  constructor(private http: HttpClient) {}

  getAllProducts() {
    return this.http.get<Product[]>(`${this.url}`);
  }

  addNewProduct(data: ProductCreate) {
    return this.http.post(`${this.url}`, data);
  }

  updateStatusProduct(data: ProductUpdateStatus) {
    return this.http.put(`${this.url}/updateStatus`, data);
  }

  updateProduct(data: ProductUpdate) {
    return this.http.put(`${this.url}`, data);
  }

  deleteProduct(productId: number) {
    return this.http.delete(`${this.url}/${productId}`);
  }
}
