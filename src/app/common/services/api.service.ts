import {BehaviorSubject, Observable} from "rxjs/index";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";

@Injectable()
export class ApiService {

  constructor(public http: HttpClient,
              private router_service: Router) {
  }


  public http_get(uri: string): Observable<any> {
    return Observable.create(observer => {
      let headers = new HttpHeaders();
      headers = headers.append("Authorization","Bearer " + localStorage.getItem('token'));
      // headers = headers.append("Content-Type", "application/json");
      this.http.get<any>(environment.api_base_url + environment.api_content_url + uri, {headers:headers,observe: 'response'})
      // this.http.get<any>(environment.api_base_url + uri, {observe: 'response'})
        .subscribe(
          (response) => {
            const api_status_code = response.headers.get('api_status_code');
            const api_status_message = response.headers.get('api_status_message');
            environment.production === false ? console.log(response) : 0;
            observer.next(response.body);
            observer.complete();
          }, error => {
            console.log("Get Error :", error)
          }
        );
    });
  }

  public http_post(uri: string, post_data): Observable<any> {
    return Observable.create(observer => {
      environment.production === false ? console.log(environment.api_base_url + uri, post_data) : 0;
      // let headers = new HttpHeaders();
      // headers = headers.append("Authorization","Basic " + btoa("wsuser:AirSiebel"));
      // headers = headers.append("Content-Type", "application/json");
      // this.http.post<any>(environment.api_base_url + uri, post_data, {headers:headers,observe: 'response'})
      this.http.post<any>(environment.api_base_url + uri, post_data, {observe: 'response'})
        .subscribe(
          (response) => {
            const api_status_code = response.headers.get('api_status_code');
            const api_status_message = response.headers.get('api_status_message');
            environment.production === false ? console.log(response.body) : 0;
            observer.next(response.body);
            observer.complete();
          }, error => {
            console.log("Post Error :", error)
          }
        );
    });
  }
}
