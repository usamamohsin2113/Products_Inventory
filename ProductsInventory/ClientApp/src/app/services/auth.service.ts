import { animate } from '@angular/animations';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
//import { IUser } from '../Interfaces/IUser';
import { HttpBaseService } from './base/http-base.service';
//import { ToastrService } from './toastr.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public obj: any;
  private currentUserSource = new BehaviorSubject<any>(null!);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(public http: HttpBaseService, private router: Router) { }

  // public SignUp(data: any) {
  //   this.http.post('Account/SignUp', data).subscribe(resp=>{

  //     if(!resp.success) {
  //       //this.toastr.error(resp.message);
  //       return;
  //     }

  //     this.router.navigate([`auth/Confirmation/${resp.refObj.id}`]);

  //   });
  // }
  public SignIn(data: any) {
    return this.http
      .post('Authenticate/Login', data)
      .subscribe((resp: { success: any; data: any; message: string }) => {
        //
        //localStorage.setItem('data', resp.refObj);
        //console.log("data", resp.data);
        //this.router.navigate(['/dashboard']);
        if (resp.success) this.setLocalStorage(resp);
        // this.toastr.error(resp.message);
        else alert(resp.message);
      });
  }
  public setLocalStorage(resp: any) {
    if (resp.success) {
      localStorage.setItem('token', resp.data.token);
      this.currentUserSource.next(resp.data);

      localStorage.setItem('current_user', JSON.stringify(resp.data));

      this.router.navigate(['/products']);

      return;
    }
    // else if(resp.refObj && !resp.refObj.isEmailConfirmed)
    //   this.router.navigate([`auth/Confirmation/${resp.refObj.userId}`]);
    // else this.toastr.error('Error');
    alert('Error');
  }

  public isAuthenticated() {
    return this.getToken() ? true : false;
  }

  getUser() {
    var user = JSON.parse(localStorage.getItem('current_user')!);
    return user;
  }
  public getToken() {
    return localStorage.getItem('token');
  }

  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('current_user');
    //localStorage.removeItem("call_filter_data");
    this.router.navigate(['login']);
    this.currentUserSource.next(null!);
  }
}
