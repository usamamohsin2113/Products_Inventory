import { Injectable } from '@angular/core';
import { HttpBaseService } from './base/http-base.service';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  constructor(private http: HttpBaseService) { }

  getProducts() {
    return this.http.post('Product/GetAll',null)
  }

  getById(id:number) {
    return this.http.get(`products/getById?id=${id}`);
  }

  createProduct(product: {}) {
    return this.http.post('products/create',product);
  }

  updateProduct(product: {}) {
    return this.http.post('products/update',product);
  }

  deleteProduct(productId: any) {
    return this.http.post(`product/delete?productId=${productId}`,'');
  }
}
