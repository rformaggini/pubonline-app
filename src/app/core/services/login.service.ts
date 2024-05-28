import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENVIRONMENT } from '@environment/environment';
import { Login } from '@models/login.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private url = `${ENVIRONMENT.apiUrl}/login`;

  constructor(private http: HttpClient) {}

  login(login: Login) {
    return this.http.post(`${this.url}`, login);
  }
}
