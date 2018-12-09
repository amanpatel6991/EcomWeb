import {Component, OnInit} from '@angular/core';
import {AppRoutingService} from "../../common/services/routing.service";
import {CommonService} from "../../common/services/common.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public routingService: AppRoutingService, public commonService: CommonService) {
  }

  ngOnInit() {
    // console.log("in home ::",this.commonService.signedIn.getValue());
    // if (this.commonService.signedIn.getValue()) {
    //   this.routingService.routeToEntity("userDashboard")
    // }
  }

}
