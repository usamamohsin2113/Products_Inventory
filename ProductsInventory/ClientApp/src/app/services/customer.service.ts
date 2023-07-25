import { Injectable } from '@angular/core';
import { HttpBaseService } from './base/http-base.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpBaseService) { }

  getCustomers() {
    return this.http.post('Customer/GetAll', null);
  }

}
