import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../common/services/auth.service";
import {Subscription} from "rxjs/Rx";
import {AppRoutingService} from "../../common/services/routing.service";
import {Login} from "../../common/Models/login.model";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit,OnDestroy {

  subscriptions: Subscription[] = [];

  signUpForm: FormGroup;
  signupInfo: Login;

  constructor(public authService: AuthService,public routingService:AppRoutingService) {
  }

  ngOnInit() {
    this.signupInfo = new Login;

    if (this.authService.isUserAuthenticated()) {
      this.routingService.routeToEntity("userDashboard");
      console.log("in signin (signed in) is true");
      this.authService.userSignedIn.next(true);
    }

    this.subscriptions.push(this.authService.userSignedIn.subscribe(
      (data) => {
        if (data) {
          this.routingService.routeToEntity("userDashboard");
          console.log("in signin (signed in) :", data)
        }
      }
    ));

    this.initsignUpForm();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((value, index, array) => value.unsubscribe());
  }

  routeToEntity(entity) {
    this.routingService.routeToEntity(entity)
  }

  initsignUpForm() {
    this.signUpForm = new FormGroup({
      'first_name': new FormControl(this.signupInfo.first_name, null),
      'last_name': new FormControl(this.signupInfo.last_name, null),
      'email': new FormControl(this.signupInfo.email, null),
      'password': new FormControl(this.signupInfo.password, null),
      'confirm_password': new FormControl(this.signupInfo.confirm_password, null),
    });
  }

  onUserSignUp() {
    console.log("maunual sign up :", this.signupInfo);

    if (this.signupInfo.password != this.signupInfo.confirm_password) {
      alert("Passwords don't match !");
      return
    }

    if (this.signupInfo.email == "" || this.signupInfo.password == "") {
      alert("Cannot Signup with blank Email and/or Password !");
      return
    }

    const upsert_array = {};
    upsert_array['email'] = this.signupInfo.email;
    upsert_array['password'] = this.signupInfo.password;
    upsert_array['first_name'] = this.signupInfo.first_name;
    upsert_array['last_name'] = this.signupInfo.last_name;


    this.authService.signUpUser(upsert_array)

  }

}
