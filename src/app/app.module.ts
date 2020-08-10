import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {LoginService} from './login/login.service';
import { RequestAccessComponent } from './request-access/request-access.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { LiveComponent } from './live/live.component';
import {AuthService} from './auth.service';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UserAccessComponent } from './user-access/user-access.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { GoogleMapsModule } from '@angular/google-maps';
import {SocketService} from './socket.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RequestAccessComponent,
    LiveComponent,
    SidebarComponent,
    UserAccessComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatSliderModule,
    MatDatepickerModule,
    MatCheckboxModule,
    GoogleMapsModule
  ],
  providers: [AuthService, SocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
