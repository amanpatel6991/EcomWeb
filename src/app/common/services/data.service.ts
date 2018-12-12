import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BehaviorSubject, Subject} from "rxjs/index";
import {AppRoutingService} from "./routing.service";
import {AuthService} from "./auth.service";
import {ApiService} from "./api.service";

@Injectable()
export class DataService {

  constructor(private router: Router,
              private activated: ActivatedRoute,
              private apiService: ApiService,
              private authService: AuthService,
              private routingService: AppRoutingService) {
  }


  testProtectedResource() {
    this.apiService.http_get('sample')
      .subscribe((response) => {
      console.log("protected resp (data service) ::" , response)
        if (response.statuscode == "401") {
        this.authService.signOutUser()
        }
      });
  }
}
