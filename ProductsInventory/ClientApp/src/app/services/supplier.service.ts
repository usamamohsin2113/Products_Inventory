import { Injectable } from '@angular/core';
import { HttpBaseService } from './base/http-base.service';

@Injectable({
  providedIn: 'root'
})

export class SupplierService {

  constructor(private http: HttpBaseService) 
  { }

  getSuppliers() {
    return this.http.post('Supplier/GetAll', null);
  }

}
