import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SupplierService } from '../../../services/supplier.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit,OnDestroy {
  suppliers!: any[];
  obs!: Subscription;
  
  constructor(private svc: SupplierService) {
      
  }

  ngOnInit()
  {
     this.obs= this.svc.getSuppliers().subscribe((x:any)=> {
        this.suppliers=x.data;
     });
  }

  
  ngOnDestroy()
  {
    this.obs.unsubscribe();
  }
}
