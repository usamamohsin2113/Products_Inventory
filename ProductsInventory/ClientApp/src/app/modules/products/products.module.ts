import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { SaleComponent } from './sale/sale.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { RouterModule, Routes } from '@angular/router';
import { ProductFormComponent } from './product-form/product-form.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent
  }
]

@NgModule({
  declarations: [
    IndexComponent,
    PurchaseComponent,
    SaleComponent,
    ProductFormComponent,
  ],
  imports: [
    CommonModule,
    GridModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})

export class ProductsModule { }
