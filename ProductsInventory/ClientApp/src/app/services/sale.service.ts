import { Injectable } from '@angular/core';
import { HttpBaseService } from './base/http-base.service';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  constructor(private http: HttpBaseService) { }

  getAll() {
    return this.http.get('sale/getAll');
  }

  sellProduct(sellProduct: any) {
    return this.http.post('Sale/Create',sellProduct);
  }

  createSale(data: any) {
    return this.http.post('Sale/Create', data);
  }

  updateSale(data: any) {
    return this.http.post('Sale/Update', data);
  }

  deleteSale(saleId: any) {
    return this.http.post(`sale/Delete?saleId=${saleId}`, '');
  }

  getSingleSale(saleId: any) {
    return this.http.post(`sale/Get?saleId=${saleId}`, '');
  }

}
