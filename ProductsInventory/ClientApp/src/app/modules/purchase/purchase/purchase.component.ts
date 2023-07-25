import { Component, OnInit } from '@angular/core';
import { PurchaseService } from '../../../services/purchase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {

  constructor(private purchaseService: PurchaseService, private router: Router) { }
  products: any[] = [];

  ngOnInit() {
    this.getPurchases();
  }

  getPurchases() {
    this.purchaseService.getAllPurchases().subscribe((result: any) => {
      console.log("purchases", result)
      this.products = result.data;
    })
  }

  create() {
    this.router.navigate(['purchase/purchase']);
  }

  edit(dataItem: any) {
    this.router.navigate(['purchase/purchase', dataItem.purchaseId]);
  }

  delete(dataItem: any) {
    this.purchaseService.deletePurchase(dataItem.purchaseId).subscribe((result: any) => {
      if (result.success) {
        this.getPurchases();
        alert("Purchase deleted");
      }
    })
  }
}
