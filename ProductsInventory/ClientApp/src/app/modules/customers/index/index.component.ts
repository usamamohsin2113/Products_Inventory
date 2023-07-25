import { CustomerService } from '../../../services/customer.service';
import { ViewChild } from "@angular/core";
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SortDescriptor } from '@progress/kendo-data-query';
import { DataBindingDirective } from "@progress/kendo-angular-grid";
import { SVGIcon, filePdfIcon, fileExcelIcon } from "@progress/kendo-svg-icons";
import { process } from "@progress/kendo-data-query";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})

export class IndexComponent {
  customers!: any[];
  obs!: Subscription;
  
  constructor(private svc: CustomerService) {
      
  }

  ngOnInit()
  {
     this.obs= this.svc.getCustomers().subscribe((x:any)=> {
        this.customers=x.data;
     });
  }

  
  ngOnDestroy()
  {
    this.obs?.unsubscribe();
  }
}
