import { Injectable } from '@angular/core';
import { HttpBaseService } from './base/http-base.service';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(private http: HttpBaseService) { }

  getPurchaseReport(fromDate: Date, toDate: Date, type: string) {
    return this.http.get(`reports/GetPurchasesReport?fromDate=${fromDate.toDateString()}&toDate=${toDate.toDateString()}&type=${type}`);
  }

  getSaleReport(fromDate: Date, toDate: Date, type: string) {
    return this.http.get(`reports/GetSalesReport?fromDate=${fromDate.toDateString()}&toDate=${toDate.toDateString()}&type=${type}`);
  }

}
