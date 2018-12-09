import {Injectable} from '@angular/core';
// import {Http, Headers, Response, RequestOptions} from '@angular/http';
import {JwtHelperService} from '@auth0/angular-jwt';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Subject} from "rxjs/index";
import {environment} from "../../../environments/environment";
import {AppRoutingService} from "./routing.service";
import {CookieService} from "ngx-cookie-service";
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

  constructor(private http_service: HttpClient,
              private routingService: AppRoutingService,
              private commonService: CommonService,
              private cookieService: CookieService,
              private jwtHelper: JwtHelperService) {

    // const authUser = localStorage.getItem('authenticatedUser');
    // const token = localStorage.getItem('token');
    const token = cookieService.get('auth_token');

    this.tokenExpiration = token ? jwtHelper.getTokenExpirationDate(token) : null;
    this.tokenExpirationChanged.next(this.tokenExpiration);
  }

  // signInUser(email: string, password: string) {
  //   const http_url = environment.api_base_url + 'login';
  //   // const http_headers = new Headers({'username': email, 'password': password});
  //   // const http_options = new RequestOptions({headers: http_headers});
  //
  //   // let headers = new HttpHeaders();
  //   // headers = headers.append('username' , email);
  //   // headers = headers.append('password' , password);
  //
  //   this.commonService.onloadingStart();
  //
  //   this.http_service.get<any>(http_url, {observe: 'response', headers: new HttpHeaders({'username': email, 'password': password})})
  //     .subscribe(
  //       (response) => {
  //         this.commonService.onloadingEnd();
  //         console.log("login resp :" , response);
  //         const api_status_code = response.headers.get('api_status_code');
  //         switch (api_status_code) {
  //           case '200': {
  //             const token = response.body.token;
  //             const payload = this.jwtHelper.decodeToken(token);
  //             this.tokenExpiration = this.jwtHelper.getTokenExpirationDate(token);
  //             this.tokenExpirationChanged.next(this.tokenExpiration);
  //             this.authenticatedUser = {
  //               'id': payload.id,
  //               'first_name': payload.first_name,
  //               'last_name': payload.last_name,
  //               'email': payload.email,
  //               'user_type': payload.user_type,
  //               'profile_photo': payload.profile_photo,
  //               'user_org_integration_id': payload.user_org_integration_id,
  //               'locale': payload.locale,
  //             };
  //             this.user_org_integration_id = payload.user_org_integration_id;
  //             localStorage.setItem('token', token);
  //             localStorage.setItem('authenticatedUser', JSON.stringify(this.authenticatedUser));
  //             this.routingService.routeToDashBoard();
  //             break;
  //           }
  //
  //           default: {
  //             this.login_error = 'Email/Password Incorrect!';
  //             break;
  //           }
  //         }
  //       }
  //     );
  // }

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
  //
  // isUserAuthenticated() {
  //   const token: string = this.jwtHelper.tokenGetter();
  //   if (!token) {
  //     return false;
  //   }
  //
  //   const tokenExpired: boolean = this.jwtHelper.isTokenExpired(token);
  //   return !tokenExpired;
  // }

  signOutUser() {
    // localStorage.removeItem('token');
    // localStorage.removeItem('authenticatedUser');
    this.cookieService.delete("auth_token");
    this.authenticatedUser = null;
    this.routingService.routeToRoot();
  }

}
