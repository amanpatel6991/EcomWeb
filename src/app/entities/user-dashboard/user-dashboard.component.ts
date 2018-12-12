import {Component, OnInit} from '@angular/core';
import {CommonService} from "../../common/services/common.service";
import {Subscription} from "rxjs/index";
import {AppRoutingService} from "../../common/services/routing.service";
import {AuthService} from "../../common/services/auth.service";
import {DataService} from "../../common/services/data.service";

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  subscriptions: Subscription[] = [];
  signedInStatus = false;

  constructor(public commonService: CommonService,
              public authService: AuthService,
              public dataService: DataService,
              public routingService: AppRoutingService) {
  }

  ngOnInit() {
    console.log("in dasbord");

    if (this.authService.isUserAuthenticated()) {
      // this.routingService.routeToEntity("userDashboard");
      this.signedInStatus = true;
      console.log("in main (signed in) is true")
      this.authService.userSignedIn.next(true);

    }
    // window.location.reload()
    this.subscriptions.push(this.authService.userSignedIn.subscribe(
      (data) => {
        this.signedInStatus = data;
        console.log("sign in stats", this.signedInStatus);
        if (!this.signedInStatus) {
          this.routingService.routeToEntity("");
        }
      }
    ));


  }

  ngOnDestroy() {
    this.subscriptions.forEach((value, index, array) => value.unsubscribe());
  }

  onTestResourceClick() {
    this.dataService.testProtectedResource();
  }

}
