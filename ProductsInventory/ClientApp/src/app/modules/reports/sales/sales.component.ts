import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { SupplierService } from '../../../services/supplier.service';
import { IPurchaseForm } from '../../../interfaces/product-form-data';
import { PurchaseService } from '../../../services/purchase.service';
import { SaleService } from '../../../services/sale.service';
import { CustomerService } from '../../../services/customer.service';
import { ReportsService } from '../../../services/reports.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css'],
})
export class SalesComponent {
  selectedType: string = 'daily';
  types: string[] = ['daily', 'monthly', 'yearly'];
  fromDate: Date = new Date();
  toDate: Date = new Date();
  chartData: any = [];

  constructor(private reportsService: ReportsService) { }

  getChart() {
    console.log("getting chart");
    this.reportsService.getSaleReport(this.fromDate, this.toDate, this.selectedType).subscribe((result: any) => {
      if (result.success) {
        this.chartData = result.data;


        console.log(this.chartData);
      }
    });
  }
  
  
}
