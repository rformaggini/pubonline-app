import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '@models/login.model';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private url = `${environment.apiUrl}/login`;

  constructor(private http: HttpClient) {}

  login(login: Login) {
    return this.http.post(`${this.url}`, login, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }
}
