import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { LoginService} from './login.service';
import {AuthService} from '../auth.service';
import { Router } from '@angular/router';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoginError = false;
  loginError = '';
  profileForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  // tslint:disable-next-line:no-shadowed-variable
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    console.log('this.profileForm', this.profileForm.value.email);
  }

  onSubmit() {
    this.isLoginError = false;
    // TODO: Use EventEmitter with form value
    console.warn(this.profileForm.value);
    this.authService.login(this.profileForm.value).subscribe({
      next: data => {
        console.log('login response ', data);
        // tslint:disable-next-line:triple-equals
        if (data.status) {
          console.log('success 123', data);
          localStorage.setItem('logisqUser', this.profileForm.value.email);
          // this.authService.broadcastLoginChange('wije');
          this.router.navigate(['/live']).then(r => true);
        } else {
          console.error('There was an error!', data.data.error.payload.message);
          this.loginError = data.data.error.payload.message;
          this.isLoginError = true;
        }
      },
      error: error => {
        console.error('There was an error!', error.error.payload.message);
        this.loginError = error.error.payload.message;
        this.isLoginError = true;
      }
    });
  }

}
