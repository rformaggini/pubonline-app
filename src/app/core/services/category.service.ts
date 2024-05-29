import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENVIRONMENT } from '@environment/environment';
import { Category } from '@models/category.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private url = `${ENVIRONMENT.apiUrl}/categories`;

  constructor(private http: HttpClient) {}

  getAllCategories() : Observable<Category[]> {
    return this.http.get<Category[]>(`${this.url}`);
  }
  getCategoryById(categoryId: number) {
    return this.http.get(`${this.url}/${categoryId}`);
  }
  addNewCategory(data: Category) {
    return this.http.post(this.url, data);
  }
  updateCategory(data: Category) {
    return this.http.put(`${this.url}`, data);
  }
  deleteCategory(categoryId: number) {
    return this.http.delete(`${this.url}/${categoryId}`);
  }
}
