import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RequestAccessComponent} from './request-access/request-access.component';
import {LiveComponent} from './live/live.component';
import {AuthGuardGuard} from './auth-guard.guard';
import {DashboardComponent} from './dashboard/dashboard.component';
import {UserAccessComponent} from './user-access/user-access.component';



const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {path: 'login' , component: LoginComponent, canActivate: [AuthGuardGuard]},
  {path: 'access' , component: RequestAccessComponent , canActivate: [AuthGuardGuard] },
  {path: 'live' , component: LiveComponent, canActivate: [AuthGuardGuard] },
  {path: 'user' , component: UserAccessComponent},
  {path: 'dashboard' , component: DashboardComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
