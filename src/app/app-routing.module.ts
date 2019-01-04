import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AboutUsComponent} from "./entities/about-us/about-us.component";
import {HomeComponent} from "./entities/home/home.component";
import {ContactComponent} from "./entities/contact/contact.component";
import {SigninComponent} from "./entities/signin/signin.component";
import {UserDashboardComponent} from "./entities/user-dashboard/user-dashboard.component";
import {AuthGuard} from "./common/services/auth-guard.service";
import {SignupComponent} from "./entities/signup/signup.component";

const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: 'about', component: AboutUsComponent, pathMatch: 'full'},
  {path: 'contact', component: ContactComponent, pathMatch: 'full'},
  {path: 'signin', component: SigninComponent, pathMatch: 'full'},
  {path: 'signup', component: SignupComponent, pathMatch: 'full'},
  {path: 'userDashboard', component: UserDashboardComponent,  canActivate: [AuthGuard] ,pathMatch: 'full'},

  {path: '**', redirectTo: ''},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
