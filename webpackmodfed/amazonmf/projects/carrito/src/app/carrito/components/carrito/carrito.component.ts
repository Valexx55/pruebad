import { ProductoEvent } from './../../../../../../models/src/lib/models/producto-event';
import { Component, inject, OnInit } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';
import { CommunicationService } from '@core-lib';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit{
  

  private carritoService = inject(CarritoService)

  private sub!:Subscription;

  comservice = inject(CommunicationService)
  carrito: any[] = [];
  total = 0;

  
  ngOnInit(): void {
    this.cargarCarrito();

    this.sub = this.comservice.productoAddedSubject.subscribe(
      (evento : ProductoEvent|null) => {
        if (evento)
        {
          console.log(` Nombre = ${evento.nombre} Id = ${evento.id} `)
        } else {
          console.log(` evento nulo `)
        }
        
      }
    )
  }
  
  cargarCarrito() {
    this.carrito = this.carritoService.obtenerCarrito();
    this.total = this.carritoService.getTotal();
  }

  vaciarCarrito() {
    this.carritoService.vaciarCarrito();
    this.cargarCarrito();
  }

  /**
   * hacemos una mejora para que en caso de que cambie un elemento de 
   * la lista y haya que repintarlo no se repinten todos sino que se lo actualizo los alimentos que cambiaron realmente reutilizando el resto
   * @param _index 
   * @param item 
   * @returns 
   */
  trackById(_index: number, item: any): number {
  return item.id;
}

}