import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {AppRoutingService} from "../../common/services/routing.service";
import {GoogleSignInSuccess} from 'angular-google-signin';
import {Subscription} from "rxjs/index";
import {CommonService} from "../../common/services/common.service";
import signIn = gapi.auth.signIn;
import {AuthService} from "../../common/services/auth.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs/operators";


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit, OnDestroy {

  activeMenuTab = '';
  // signedInStatus = false;

  basicMenuIconsClicked = true;
  subscriptions: Subscription[] = [];

  constructor(public routingService: AppRoutingService,
              public authService: AuthService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              public commonService: CommonService) {
  }

  ngOnInit() {
    this.routingService.routeToEntity('')
    //Todo For future use
    // if (this.authService.isUserAuthenticated()) {
    //   this.routingService.routeToEntity("userDashboard");
    //   this.signedInStatus = true;
    //   console.log("in main (signed in) is true")
    //   this.authService.userSignedIn.next(true);
    //
    // }

    // this.subscriptions.push(this.authService.userSignedIn.subscribe(
    //   (data) => {
    //     this.signedInStatus = data;
    //     console.log("sign in stats", this.signedInStatus);
    //     console.log("in main (signed in) :", data)
    //   }
    // ));


  }

  ngOnDestroy() {
    this.subscriptions.forEach((value, index, array) => value.unsubscribe());
  }


  routeToEntity(entity) {
    this.activeMenuTab = entity;
    if (entity == "" || entity == "about" || entity == "contact") {
      this.basicMenuIconsClicked = true;
    } else {
      this.basicMenuIconsClicked = false;
    }
    this.routingService.routeToEntity(entity)
  }

  // onSignOut() {
  //   console.log("sign out clicked");
  //   this.authService.signOutUser();
  // }

}
