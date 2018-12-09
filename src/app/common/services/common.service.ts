import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BehaviorSubject, Subject} from "rxjs/index";
import {AppRoutingService} from "./routing.service";

@Injectable()
export class CommonService {

  constructor(private router: Router,
              private activated: ActivatedRoute,
              private routingService: AppRoutingService) {
  }

  signedIn = new BehaviorSubject<boolean>(false);

  isLoading = new Subject<boolean>();

  isAuthenticated() {
    return this.signedIn.getValue();
  }

  onSignInSuccess() {
    this.signedIn.next(true);
    this.routingService.routeToEntity("userDashboard");
  }

  onloadingStart() {
    this.isLoading.next(true);
  }

  onloadingEnd() {
    this.isLoading.next(false);
  }

}
