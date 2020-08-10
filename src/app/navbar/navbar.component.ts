import { Component, OnInit ,AfterViewChecked } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit , AfterViewChecked {
  userEmail = '';
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    // this.authService.name.subscribe((val) => {
    //   console.log('usernamee', val);
    //   this.userEmail = val;
    // });
    try {
      this.userEmail = localStorage.getItem('logisqUser');
    } catch (e) {
    }
  }

  ngAfterViewChecked() {

    // this.authService.currentMessage.subscribe(message => console.log('xxxxxxxxxx', message));
  }


  logoutUser() {
    console.log('Logout User');
    this.authService.logout();
  }
}
