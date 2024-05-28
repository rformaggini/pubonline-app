import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENVIRONMENT } from '@environment/environment';
import { SignUp } from '@models/signup.model';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = `${ENVIRONMENT.apiUrl}/users`;

  constructor(private http: HttpClient) {}

  signUp(data: SignUp) {
    return this.http.post(`${this.url}/signup`, data);
  }

  changePassword(){

  }

  forgetPassword(){
    
  }
}
