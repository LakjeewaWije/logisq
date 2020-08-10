import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class RequestAccessService {

  constructor(private http: HttpClient) { }

  requestAccess = (value) => {
    console.log('Login Called', value);
    // tslint:disable-next-line:max-line-length
    return this.http.post('http://test.rightapps.net.au:3000/auth/request-access',
      {emailAddress: value.email,
      desiredPassword: value.password,
      contactNumber : value.contact,
      reason : value.reason
    });
  }
}
