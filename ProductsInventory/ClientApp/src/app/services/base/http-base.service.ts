import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpBaseService {

  http: any;
  token: any;
  headers: any;
  baseURL: string;
  httpOptions: any;
  defaultHttpOptions: any;

  constructor(http: HttpClient) {
    this.http = http;
    this.baseURL = environment.baseURL + 'api/';


    this.token = localStorage.getItem('token');

    if (this.token)
      this.headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token
      });

    this.httpOptions = {
      headers: this.headers,
      // observe?: 'body' | 'events' | 'response',
      //params?: HttpParams|{[param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>},
      reportProgress: true
      // responseType: 'arraybuffer'|'blob'|'json'|'text',
      //withCredentials?: boolean,
    };

    this.defaultHttpOptions = {
      headers: this.headers,
      // observe?: 'body' | 'events' | 'response',
      //params?: HttpParams|{[param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>},
      reportProgress: true,
      responseType: 'json',
      //withCredentials?: boolean,
    };

    //this.httpOptions.headers.set('Authorization', 'my-new-auth-token');

  }


  get(url: any, httpOptions: any = null) {

    this.httpOptions = httpOptions ? httpOptions : this.defaultHttpOptions;

    return this.http.get(this.baseURL + url, this.httpOptions);
  }

  post(url: any, formData: any, options: any = null) {

    this.httpOptions = options ? options : this.defaultHttpOptions;

    return this.http.post(this.baseURL + url, formData, this.httpOptions);
  }

  HandleError(error: HttpErrorResponse) {
    // if (error.status === 0)  // A client-side or network error occurred. Handle it accordingly.
    // this.toastr.error("You're disconneted, make sure your device is connected with internet.");

    // else {
    // this.toastr.error("Operation failed, please try again.");
    // }

  }
}