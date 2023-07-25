import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpBaseService } from './base/http-base.service';

@Injectable({
  providedIn: 'root'
})
export class FormServiceService {
  public form!: FormGroup;
  constructor(private http: HttpBaseService) { }

  createProduct(data: any) {
    return this.http.post('Product/Create',data);
  }

  updateProduct(data: any) {
    return this.http.post('Product/Update',data);
  }
}
