import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {CommonService} from "../../common/services/common.service";
import {Login} from "../../common/Models/login.model";
import {AppRoutingService} from "../../common/services/routing.service";
import {AuthService} from "../../common/services/auth.service";

declare const gapi: any;

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signInForm: FormGroup;

  loginInfo: Login;

  constructor(public commonService: CommonService,
              public authService: AuthService,
              public routingService: AppRoutingService) {
  }

  private myClientId: string = '556478218291-5vk6kfklnvcs5ofd1vop6kh7sqbgqpj7.apps.googleusercontent.com';

  ngOnInit() {

    console.log("in sign in ::",this.commonService.signedIn.getValue());
    if (this.commonService.signedIn.getValue()) {
      this.routingService.routeToEntity("userDashboard")
    }

    this.loginInfo = new Login;
    this.initsignInForm();
  }

  initsignInForm() {
    this.signInForm = new FormGroup({
      'username': new FormControl(this.loginInfo.username, null),
      'password': new FormControl(this.loginInfo.password, null),
    });
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

        this.commonService.onSignInSuccess()


      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }

  ngAfterViewInit(){
    this.googleInit();
  }

  onUserSignIn() {
    console.log("maunual sign in :", this.loginInfo);

    this.authService.signInUser(this.loginInfo.username , this.loginInfo.password)

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
