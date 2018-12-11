import {Injectable} from '@angular/core';
// import {Http, Headers, Response, RequestOptions} from '@angular/http';
import {JwtHelperService} from '@auth0/angular-jwt';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Subject , BehaviorSubject} from "rxjs/index";
import {environment} from "../../../environments/environment";
import {AppRoutingService} from "./routing.service";
import {CommonService} from "./common.service";

@Injectable()
export class AuthService {
  login_error = null;
  forgetPassword_error = '';
  forgetPassword_success = '';
  authenticatedUser: any;
  user_org_integration_id = '';
  tokenExpiration: Date;
  tokenExpirationChanged = new Subject<Date>();
  userSignedIn = new BehaviorSubject<boolean>(false);

  constructor(private http_service: HttpClient,
              private routingService: AppRoutingService,
              private commonService: CommonService,
              private jwtHelper: JwtHelperService) {

    // const authUser = localStorage.getItem('authenticatedUser');
    // const token = localStorage.getItem('token');
    //
    // this.tokenExpiration = token ? jwtHelper.getTokenExpirationDate(token) : null;
    // this.tokenExpirationChanged.next(this.tokenExpiration);
  }

  signInUser(credentials) {
    const http_url = environment.api_base_url + 'login';

    // this.commonService.onloadingStart();

    this.http_service.post<any>(http_url, credentials, {observe: 'response'})
      .subscribe(
        (response) => {
          // this.commonService.onloadingEnd();
          console.log("login resp ::", response, response.body.response.token, response.status);
          const api_status_code = response.status;
          switch (api_status_code) {
            case 200: {
              const token = response.body.response.token;
              const payload = this.jwtHelper.decodeToken(token);

              this.tokenExpiration = this.jwtHelper.getTokenExpirationDate(token);
              // this.tokenExpirationChanged.next(this.tokenExpiration);              //emit TOKEN EXP if needed in future
              console.log(payload);
              this.authenticatedUser = {
                'id': payload.userprofile.id,
                'first_name': payload.userprofile.first_name,
                'last_name': payload.userprofile.last_name,
                'email': payload.userprofile.email,
              };
              localStorage.setItem('token', token);
              localStorage.setItem('authenticatedUser', JSON.stringify(this.authenticatedUser));

              this.userSignedIn.next(true);
              this.routingService.routeToDashBoard();

              break;
            }

            default: {
              this.login_error = 'Email/Password Incorrect!';
              break;
            }
          }
        }
      );
  }

  // forgotPassword(email: string) {
  //   const http_url = environment.api_base_url + 'forgot_password';
  //   // const http_headers = new Headers({'email': email});
  //   // const http_options = new RequestOptions({headers: http_headers});
  //
  //   this.commonService.onloadingStart();
  //   // this.http_service.get(http_url, http_options)
  //   this.http_service.get<any>(http_url, {observe: 'response', headers: new HttpHeaders({'email': email})})
  //     .subscribe(
  //       (response) => {
  //         this.commonService.onloadingEnd();
  //         const api_status_code = response.headers.get('api_status_code');
  //         switch (api_status_code) {
  //           case '1002': {
  //             this.forgetPassword_success = 'Password reset link has been sent to your email address.';
  //             break;
  //           }
  //
  //           case '1003': {
  //             this.forgetPassword_error = 'User with Email: ' + email + ' does not exist. Please provide the correct email address.';
  //             break;
  //           }
  //         }
  //       }
  //     );
  // }

  isUserAuthenticated() {
    const token: string = this.jwtHelper.tokenGetter();
    if (!token) {
      return false;
    }

    const tokenExpired: boolean = this.jwtHelper.isTokenExpired(token);
    return !tokenExpired;
  }


  // onSignInSuccess() {
  //   this.signedIn.next(true);
  //   this.routingService.routeToEntity("userDashboard");
  // }

  signOutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('authenticatedUser');
    this.userSignedIn.next(false);
    this.authenticatedUser = null;
    this.routingService.routeToRoot();
  }

}
