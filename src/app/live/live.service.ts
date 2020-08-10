import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AuthService} from '../auth.service';
@Injectable({
  providedIn: 'root'
})
export class LiveService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  deviceList = () => {
    const token = this.authService.getJwtToken();
    const headers = { AUTHORIZATION: `Bearer ${token}`};
    console.log('deviceList Called');
    // tslint:disable-next-line:max-line-length
    return this.http.get('http://test.rightapps.net.au:3000/live', { headers});
  }
}
