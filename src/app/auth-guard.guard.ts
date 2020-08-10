import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  // @ts-ignore
  canActivate(route: ActivatedRouteSnapshot , state: RouterStateSnapshot) {
    if (state.url.includes('login') || state.url.includes('access') ) {
      if (this.authService.isLoggedIn()) {
        this.router.navigate(['/live']).then(r => true);
      }
      return !this.authService.isLoggedIn();
    } else if (state.url.includes('live')) {
      if (!this.authService.isLoggedIn()) {
        this.router.navigate(['/login']).then(r => true);
      }
      return this.authService.isLoggedIn();
    }
  }
}
