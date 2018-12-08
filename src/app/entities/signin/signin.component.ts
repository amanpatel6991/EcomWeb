import {Component, OnInit} from '@angular/core';
import {GoogleSignInSuccess} from "angular-google-signin";
import {FormControl, FormGroup} from "@angular/forms";
import {CommonService} from "../../common/services/common.service";
import {Login} from "../../common/Models/login.model";
import {AppRoutingService} from "../../common/services/routing.service";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signInForm: FormGroup;

  loginInfo: Login;

  constructor(public commonService: CommonService,public routingService: AppRoutingService) {
  }

  private myClientId: string = '556478218291-5vk6kfklnvcs5ofd1vop6kh7sqbgqpj7.apps.googleusercontent.com';

  ngOnInit() {
    this.loginInfo = new Login;
    this.initsignInForm();
  }

  initsignInForm() {
    this.signInForm = new FormGroup({
      'username': new FormControl(this.loginInfo.username, null),
      'password': new FormControl(this.loginInfo.password, null),
    });
  }

  onGoogleSignInSuccess(event: GoogleSignInSuccess) {
    console.log('in signin');

    let googleUser: gapi.auth2.GoogleUser = event.googleUser;
    // let id: string = googleUser.getId();
    let profile: gapi.auth2.BasicProfile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Name: ' + profile.getEmail());

    //todo make this work , only working from manual signin now
    // this.commonService.signedIn.next(true)
  }

  onGoogleSignInFail(event) {
    console.log('Sign In FAILED !!', event);
  }

  onUserSignIn() {
    console.log("maunual sign in :", this.loginInfo);
    this.commonService.signedIn.next(true);

    this.routingService.routeToEntity("userDashboard");

  }

}
