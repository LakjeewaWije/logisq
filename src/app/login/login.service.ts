import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  loginUser = (value) => {
    console.log('Login Called', value);
    // tslint:disable-next-line:max-line-length
    return this.http.post('http://test.rightapps.net.au:3000/auth/login', { emailAddress: value.email, password: value.password });
  }
}
