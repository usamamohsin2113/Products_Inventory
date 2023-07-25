import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
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

export class CustomersModule { }
