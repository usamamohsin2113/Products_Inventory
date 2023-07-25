import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SaleService } from '../../../services/sale.service';

@Component({
  selector: 'app-salesList',
  templateUrl: './salesList.component.html',
  styleUrls: ['./salesList.component.css']
})
export class SalesListComponent {

  constructor(private saleService: SaleService, private router: Router) { }
  products: any[] = [];

  ngOnInit() {
    this.getSales();
  }

  getSales() {
    this.saleService.getAll().subscribe((result: any) => {
      this.products = result.data;
    })
  }

  create() {
    this.router.navigate(['sale/Sale']);
  }

  edit(dataItem: any) {
    this.router.navigate(['sale/Sale', dataItem.saleId]);
  }

  delete(dataItem: any) {
    this.saleService.deleteSale(dataItem.saleId).subscribe((result: any) => {
      if (result.success) {
        this.getSales();
        alert("Sale deleted");
      }
    })
  }
}
