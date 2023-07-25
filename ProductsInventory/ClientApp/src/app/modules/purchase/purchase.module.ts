import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from '../../pipes/FilterPipe.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { GridModule } from '@progress/kendo-angular-grid';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { FormFieldModule } from '@progress/kendo-angular-inputs';
import { PurchaseComponent } from './purchase/purchase.component';

const routes: Routes = [
  {
    path: 'purchase',
    component: IndexComponent
  },
  {
    path: '',
    component: PurchaseComponent
  },
  {
    path: 'purchase/:id',
    component: IndexComponent
  },
]

@NgModule({
  declarations: [
    IndexComponent,
    FilterPipe,
    PurchaseComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    GridModule,
    DropDownsModule,
    FormFieldModule,
    ButtonsModule,
    InputsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class PurchaseModule { }
