import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { PurchasesComponent } from './purchases/purchases.component';
import { RouterModule, Routes } from '@angular/router';
//import { FormsModule } from '@angular/forms';
import { FilterPipes } from '../../pipes/FilterPipes.pipe';
import { ReactiveFormsModule } from '@angular/forms';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { GridModule } from '@progress/kendo-angular-grid';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { FormFieldModule, InputsModule } from '@progress/kendo-angular-inputs';
import { IndexComponent } from './index/index.component';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { SalesListComponent } from './salesList/salesList.component';

const routes: Routes = [
  {
    path: 'Sale',
    component: IndexComponent,
  },
  {
    path: '',
    component: SalesListComponent
  },
  {
    path: 'Sale/:id',
    component: IndexComponent,
  },
];
@NgModule({
  declarations: [IndexComponent, FilterPipes, SalesListComponent],
  imports: [
    CommonModule,
    FormsModule,
    GridModule,
    DropDownsModule,
    ButtonsModule,
    InputsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
})
export class SaleModule {}
