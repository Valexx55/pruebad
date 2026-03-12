import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarritoRoutingModule } from './carrito-routing.module';
import { CarritoComponent } from './components/carrito/carrito.component';
import { StoreModule } from '@ngrx/store';
import { cartReducer } from '@core-lib';


@NgModule({
  declarations: [
    CarritoComponent
  ],
  imports: [
    CommonModule,
    CarritoRoutingModule,
    
  ]
})
export class CarritoModule { }
