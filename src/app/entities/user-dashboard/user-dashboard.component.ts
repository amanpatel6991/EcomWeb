import {Component, OnInit} from '@angular/core';
import {CommonService} from "../../common/services/common.service";
import {Subscription} from "rxjs/index";
import {AppRoutingService} from "../../common/services/routing.service";

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  subscriptions: Subscription[] = [];
  signedInStatus = false;

  constructor(public commonService: CommonService, public routingService: AppRoutingService) {
  }

  ngOnInit() {
    console.log("in dasbord");

    this.subscriptions.push(this.commonService.signedIn.subscribe(
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
}
