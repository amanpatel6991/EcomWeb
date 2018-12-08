import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BehaviorSubject, Subject} from "rxjs/index";

@Injectable()
export class CommonService {

  constructor(private router: Router,
              private activated: ActivatedRoute) {
  }

  signedIn = new BehaviorSubject<boolean>(false);

  isAuthenticated() {
    return this.signedIn.getValue();
  }

}
