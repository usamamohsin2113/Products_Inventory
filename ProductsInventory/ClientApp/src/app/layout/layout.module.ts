import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BaseComponent } from './base/base.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [
    BaseComponent,
    NavMenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AppRoutingModule
  ]
})
export class LayoutModule { }
