import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignUp } from '@models/signup.model';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {}

  signUp(data: SignUp) {
    return this.http.post(`${this.url}/signup`, data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }
}
