import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Producto } from '../../models/producto.model';

@Component({
  selector: 'app-producto-card',
  templateUrl: './producto-card.component.html',
  styleUrls: ['./producto-card.component.css']
})
export class ProductoCardComponent {


  //com de padre al hijo
   @Input() producto!:Producto;//productos en curso
   //del componente hijo al padre 
   @Output() agregar = new EventEmitter<Producto>();

   constructor()
   {
    /*this.producto = {
      id: 5
    }*/
   }
   onAgregar() {
    this.agregar.emit(this.producto)
  }

}
