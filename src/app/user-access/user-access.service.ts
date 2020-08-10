import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AuthService} from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserAccessService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  getAccessDetails = () => {
    const token = this.authService.getJwtToken();
    const headers = { AUTHORIZATION: `Bearer ${token}`};
    console.log('Useraccess get Called');
    // tslint:disable-next-line:max-line-length
    return this.http.get('http://test.rightapps.net.au:3000/user-access', {headers});
  }
  userAction = (id, action) => {
    const token = this.authService.getJwtToken();
    const headers = { AUTHORIZATION: `Bearer ${token}`};
    const url = `http://test.rightapps.net.au:3000/user-access/${id}/${action}`;
    return this.http.patch(url, {}, {headers});
  }
}
