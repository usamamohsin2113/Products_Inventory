import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesComponent } from './sales/sales.component';
//import { PurchasesComponent } from './purchases/purchases.component';
import { RouterModule, Routes } from '@angular/router';
//import { FormsModule } from '@angular/forms';
//import { FilterPipe } from '../../pipes/FilterPipes.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { GridModule } from '@progress/kendo-angular-grid';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { PurchasesComponent } from './purchases/purchases.component';
import { DateInputsModule } from "@progress/kendo-angular-dateinputs";
import { ChartsModule } from "@progress/kendo-angular-charts";
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';

const routes: Routes = [
  {
    path: '',
    component: PurchasesComponent
  },
  {
    path: 'SaleReport',
    component: SalesComponent
  },
];

@NgModule({
  declarations: [PurchasesComponent, SalesComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    GridModule,
    ButtonsModule,
    InputsModule,
    DateInputsModule,
    ChartsModule,
    DropDownsModule,
    RouterModule.forChild(routes),
  ],
})

export class ReportsModule {}
