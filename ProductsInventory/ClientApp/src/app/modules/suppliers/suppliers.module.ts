import { NgModule, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { RouterModule, Routes } from '@angular/router';
import { SupplierService } from '../../services/supplier.service';
import { Subscription } from 'rxjs';
import { GridModule } from '@progress/kendo-angular-grid';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent
  }
]

@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,  
    GridModule,
    RouterModule.forChild(routes)
  ]
})
export class SuppliersModule implements OnInit,OnDestroy {


  suppliers!: any[];
  obs!: Subscription;
  
  constructor(private svc: SupplierService) {
      
  }

  ngOnInit()
  {
     this.obs= this.svc.getSuppliers().scubscribe((x:any)=> {
        this.suppliers=x.data;
     });
  }

  
  ngOnDestroy()
  {
    this.obs?.unsubscribe();
  }

 }
