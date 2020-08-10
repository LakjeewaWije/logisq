import { Injectable } from '@angular/core';
import {catchError, mapTo, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {config, Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private loggedUser: string;

  constructor(private http: HttpClient) {}

  login(value): Observable<any> {
    return this.http.post<any>(`http://test.rightapps.net.au:3000/auth/login`, { emailAddress: value.email, password: value.password })
      .pipe(
        tap(data => this.doLoginUser(data)),
        mapTo({status: true}),
        catchError(error => {
          // alert(error.error);
          return of({status: false , data: error});
        }));
  }

  // logout() {
  //   return this.http.post<any>(`${config.apiUrl}/logout`, {
  //     refreshToken: this.getRefreshToken()
  //   }).pipe(
  //     tap(() => this.doLogoutUser()),
  //     mapTo(true),
  //     catchError(error => {
  //       alert(error.error);
  //       return of(false);
  //     }));
  // }
  logout() {
    this.doLogoutUser();
  }

  isLoggedIn() {
    return !!this.getJwtToken();
  }

  // refreshToken() {
  //   return this.http.post<any>(`${config.apiUrl}/refresh`, {
  //     refreshToken: this.getRefreshToken()
  //   }).pipe(tap((tokens: Tokens) => {
  //     this.storeJwtToken(tokens.jwt);
  //   }));
  // }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  private doLoginUser(data) {
    console.log('dataaaaaa', data.payload.data.accessToken);
    // this.loggedUser = username;
    this.storeTokens(data.payload.data.accessToken);
  }

  private doLogoutUser() {
    this.loggedUser = null;
    this.removeTokens();
  }

  private getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  private storeTokens(token: any) {
    localStorage.setItem(this.JWT_TOKEN, token);
    // localStorage.setItem(this.REFRESH_TOKEN, tokens.refreshToken);
  }

  private removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
    // localStorage.removeItem(this.REFRESH_TOKEN);
  }
}
