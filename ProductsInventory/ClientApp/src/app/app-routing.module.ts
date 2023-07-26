import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BaseComponent } from './layout/base/base.component';
import { AuthGuard } from './guards/auth.guard';
import { PreventAuthGuard } from './guards/prevent-auth.guard';


const routes: Routes = [
  {
    path: 'login',
    canActivate: [PreventAuthGuard],
    loadChildren: () =>
      import('./modules/auth/auth.module').then(
        (m) => m.AuthModule
      ),
  },
  {
    path: '',
    component: BaseComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'products',
        loadChildren: () =>
          import('./modules/products/products.module').then(
            (m) => m.ProductsModule
          ),
      },
      {
        path: 'purchase',
        loadChildren: () =>
          import('./modules/purchase/purchase.module').then(
            (m) => m.PurchaseModule
          ),
      },
      {
        path: 'invoices',
        loadChildren: () =>
          import('./modules/invoices/invoices.module').then(
            (m) => m.InvoicesModule
          ),
      },
      {
        path: 'suppliers',
        loadChildren: () =>
          import('./modules/suppliers/suppliers.module').then(
            (m) => m.SuppliersModule
          ),
      },
      {
        path: 'reports',
        loadChildren: () =>
          import('./modules/reports/reports.module').then(
            (m) => m.ReportsModule
          ),
      },
      {
        path: 'reports/SaleReport',
        loadChildren: () =>
          import('./modules/reports/reports.module').then(
            (m) => m.ReportsModule
          ),
      },
      {
        path: 'sale',
        loadChildren: () =>
          import('./modules/sale/sale.module').then((m) => m.SaleModule),
      },
      {
        path: 'customers',
        loadChildren: () =>
          import('./modules/customers/customers.module').then(
            (m) => m.CustomersModule
          ),
      },

    ],
  },

];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
