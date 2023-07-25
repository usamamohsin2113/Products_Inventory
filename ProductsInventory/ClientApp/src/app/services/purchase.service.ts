import { Injectable } from '@angular/core';
import { HttpBaseService } from './base/http-base.service';

@Injectable({
  providedIn: 'root'
})

export class PurchaseService {

  constructor(private http: HttpBaseService) { }


  getAllPurchases() {
    return this.http.post('Purchase/GetAll', null);
  }

  createPurchases(data: any) {
    return this.http.post('Purchase/Create', data);
  }

  purchaseProduct(purchaseProduct: {}) {
    return this.http.post('purchase/create', purchaseProduct);
  }

  deletePurchase(purchaseId: number) {
    return this.http.post(`purchase/delete?purchaseId=${purchaseId}`, '');
  }

  getSinglePurchase(purchaseId: number) {
    return this.http.post(`purchase/get?purchaseId=${purchaseId}`, '');
  }

  updatePurchases(data: any) {
    return this.http.post('Purchase/Update', data);
  }
}
