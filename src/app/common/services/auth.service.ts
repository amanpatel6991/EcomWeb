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
  signup_error = null;
  signout_error = null;
  forgetPassword_error = '';
  forgetPassword_success = '';
  authenticatedUser: any;
  user_org_integration_id = '';
  tokenExpiration: Date;
  tokenExpirationChanged = new Subject<Date>();
  userSignedIn = new BehaviorSubject<boolean>(false);

  serverDown = new Subject<boolean>();


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
                'id': payload.user_profile.id,
                'first_name': payload.user_profile.first_name,
                'last_name': payload.user_profile.last_name,
                'email': payload.user_profile.email,
                'signed_in_source': payload.user_profile.signed_in_source,
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
        } , error => {
          // this.serverDown.next(true);
          // alert("Server Down !")
        }
      );
  }

  signInGoogleUser(userProfile) {
    const http_url = environment.api_base_url + 'googleLogin';

    console.log("userProfile ::" , userProfile)
    // this.commonService.onloadingStart();

    this.http_service.post<any>(http_url,userProfile, {observe: 'response'})
      .subscribe(
        (response) => {
          // this.commonService.onloadingEnd();
          console.log("googleLogin resp ::", response , response.body);
          const api_status_code = response.status;
          switch (api_status_code) {
            case 200: {
              const token = response.body.response.token;
              const payload = this.jwtHelper.decodeToken(token);

              this.tokenExpiration = this.jwtHelper.getTokenExpirationDate(token);
              // this.tokenExpirationChanged.next(this.tokenExpiration);              //emit TOKEN EXP if needed in future
              console.log(payload);
              this.authenticatedUser = {
                // 'id': payload.google_user_profile.id,         //upsert this record in googleUserTable in Go then return id then uncomment
                'name': payload.google_user_profile.name,
                'email': payload.google_user_profile.email,
                'signed_in_source': payload.google_user_profile.signed_in_source,
              };
              localStorage.setItem('token', token);
              localStorage.setItem('authenticatedUser', JSON.stringify(this.authenticatedUser));

              this.userSignedIn.next(true);
              this.routingService.routeToDashBoard();
              // window.location.reload();

              break;
            }

            default: {
              this.login_error = 'Email/Password Incorrect!';
              break;
            }
          }
        }, error => {
          // this.serverDown.next(true);
          // alert("Server Down !")
        }
      );
  }

  signUpUser(upsertData) {
    const http_url = environment.api_base_url + 'signup';

    // this.commonService.onloadingStart();

    this.http_service.post<any>(http_url, upsertData, {observe: 'response'})
      .subscribe(
        (response) => {
          // this.commonService.onloadingEnd();
          console.log("signup resp ::", response);
          const api_status_code = response.status;
          console.log("api_status_code :" , response.status)
          switch (api_status_code) {
            case 200: {
              // this.userSignedIn.next(true);
              this.routingService.routeToSignin();

              break;
            }

            default: {
              this.signup_error = 'Error Signing Up . Please try after sometime!';
              break;
            }
          }
        }, error => {
          // this.serverDown.next(true);
          // alert("Server Down !")
        }
      );
  }

  //todo
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
    console.log("my token :::::::" , token)
    if (!token) {
      console.log("my token 22 :::::::" , token)
      return false;
    }

    const tokenExpired: boolean = this.jwtHelper.isTokenExpired(token);
    console.log("my token expp :::::::" , tokenExpired)

    return !tokenExpired;
  }


  signOutUser() {
    const http_url = environment.api_base_url + 'signout';

    let headers = new HttpHeaders();
    headers = headers.append("Authorization","Bearer " + localStorage.getItem('token'));

    this.http_service.get<any>(http_url, {headers:headers,observe: 'response'})
      .subscribe(
        (response) => {
          // this.commonService.onloadingEnd();
          console.log("signout resp ::", response);
          const api_status_code = response.status;
          console.log("api_status_code :" , response.status)
          switch (api_status_code) {
            case 200: {

              localStorage.removeItem('token');
              localStorage.removeItem('authenticatedUser');
              this.userSignedIn.next(false);
              this.authenticatedUser = null;
              this.routingService.routeToSignin();

              break;
            }

            default: {
              this.signout_error = 'Error Signing Out . Please try after sometime!';
              break;
            }
          }
        }
      );

  }

}
