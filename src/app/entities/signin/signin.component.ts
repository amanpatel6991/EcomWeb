import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {CommonService} from "../../common/services/common.service";
import {Login} from "../../common/Models/login.model";
import {AppRoutingService} from "../../common/services/routing.service";
import {AuthService} from "../../common/services/auth.service";
import {Subscription} from "rxjs/index";

declare const gapi: any;

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit,OnDestroy {

  signInForm: FormGroup;
  loginInfo: Login;

  subscriptions: Subscription[] = [];

  constructor(public commonService: CommonService,
              public authService: AuthService,
              public routingService: AppRoutingService) {
  }

  private myClientId: string = '556478218291-5vk6kfklnvcs5ofd1vop6kh7sqbgqpj7.apps.googleusercontent.com';

  ngOnInit() {
    this.loginInfo = new Login;

    if (this.authService.isUserAuthenticated()) {
      this.routingService.routeToEntity("userDashboard");
      console.log("in signin (signed in) is true")
      this.authService.userSignedIn.next(true);
    }

    this.subscriptions.push(this.authService.userSignedIn.subscribe(
      (data) => {
        if (data) {
          this.routingService.routeToEntity("userDashboard");
          console.log("in signin (signed in) :" , data)
        }
      }
    ));


    this.initsignInForm();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((value, index, array) => value.unsubscribe());
  }


  initsignInForm() {
    this.signInForm = new FormGroup({
      'email': new FormControl(this.loginInfo.email, null),
      'password': new FormControl(this.loginInfo.password, null),
    });
  }

  routeToEntity(entity) {
    this.routingService.routeToEntity(entity)
  }

  public auth2: any;

  public googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: this.myClientId,
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignin(document.getElementById('googleBtn'));
    });
  }
  public attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {

        let profile = googleUser.getBasicProfile();
        console.log('Token || ' + googleUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
        //YOUR CODE HERE

        // this.commonService.signedIn.next(true);             //this one -> still not working
        // this.routingService.routeToEntity("userDashboard");

        // this.commonService.onSignInSuccess()
        const upsert_array = {};
        upsert_array['id'] = profile.getId();
        upsert_array['name'] = profile.getName();
        upsert_array['token'] = googleUser.getAuthResponse().id_token;
        upsert_array['email'] = profile.getEmail();

        this.authService.signInGoogleUser(upsert_array);
        window.location.reload()


      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }

  ngAfterViewInit(){
    this.googleInit();
  }

  onUserSignIn() {
    console.log("maunual sign in :", this.loginInfo);

    if (this.loginInfo.email == "" || this.loginInfo.password == "") {
      alert("Cannot Signin with blank Email and/or Password !");
      return
    }

    const upsert_array = {};
    upsert_array['email'] = this.loginInfo.email;
    upsert_array['password'] = this.loginInfo.password;


    this.authService.signInUser(upsert_array)

  }



}


//google signin method 2(not for production)


// onGoogleSignInSuccess(event: GoogleSignInSuccess) {
//   console.log('in signin');
//
//   let googleUser: gapi.auth2.GoogleUser = event.googleUser;
//   // let id: string = googleUser.getId();
//   let profile: gapi.auth2.BasicProfile = googleUser.getBasicProfile();
//   console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
//   console.log('Name: ' + profile.getName());
//   console.log('Name: ' + profile.getEmail());
//
//   // this.commonService.signedIn.next(true)
// }
//
// onGoogleSignInFail(event) {
//   console.log('Sign In FAILED !!', event);
// }

// <google-signin
//   [clientId]="myClientId"
//   [width]="myWidth"
//   [theme]="myTheme"
//   [scope]="myScope"
//   [longTitle]="myLongTitle"
// (googleSignInSuccess)="onGoogleSignInSuccess($event)"
// (googleSignInFailure)="onGoogleSignInFail($event)">
//   </google-signin>
