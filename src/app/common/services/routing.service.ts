import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Injectable()
export class AppRoutingService {

  constructor(private router: Router,
              private activated: ActivatedRoute) {
  }

  public routeToRoot() {
    this.router.navigate(['/']);
  }

  public routeToEntity(entity) {
    this.router.navigate(['/'+entity]);
  }

  public routeToDashBoard() {
    this.router.navigate(['/userDashboard']);
  }


}
