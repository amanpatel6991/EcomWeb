import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import {CommonService} from "./common.service";
import {AppRoutingService} from "./routing.service";
import {AuthService} from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
              private routingService: AppRoutingService) {}

  canActivate() {
    console.log("Auth guard :",this.authService.isUserAuthenticated());
    if (this.authService.isUserAuthenticated()) {
      return true;
    } else {
      this.routingService.routeToEntity(['']);
      return false;
    }
  }
}
