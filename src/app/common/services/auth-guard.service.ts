import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import {CommonService} from "./common.service";
import {AppRoutingService} from "./routing.service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private commonService: CommonService,
              private routingService: AppRoutingService) {}

  canActivate() {
    console.log("Auth guard :",this.commonService.isAuthenticated());
    if (this.commonService.isAuthenticated()) {
      return true;
    } else {
      this.routingService.routeToEntity(['']);
      return false;
    }
  }
}
