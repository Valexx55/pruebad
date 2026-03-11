import { ProductoEvent } from './../../../../../../models/src/lib/models/producto-event';
import { Component, inject, OnInit } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';
import { CommunicationService } from '@core-lib';
import { Observer, Subscription } from 'rxjs';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit{
  

  observerListaProductos:Observer<ProductoEvent[]> = {
  next: listaproductos => console.log('Observer got a next value: ' + listaproductos),
  error: err => console.error('Observer got an error: ' + err),
  complete: () => console.log('Observer got a complete notification'),
};

  private carritoService = inject(CarritoService)

  private sub!:Subscription;

  comservice = inject(CommunicationService)
  carrito: any[] = [];
  total = 0;

  productos$ = this.comservice.productos$;

  
  ngOnInit(): void {
    this.cargarCarrito();

   /* this.sub = this.comservice.productoAddedSubject.subscribe(
      (evento : ProductoEvent|null) => {
        if (evento)
        {
          console.log(` Nombre = ${evento.nombre} Id = ${evento.id} `)
        } else {
          console.log(` evento nulo `)
        }
        
      }
    )*/

      this.sub = this.comservice.productoAddedSubject.subscribe(
      (evento : ProductoEvent[]) => {
       
        console.table(evento)
        
      })

      this.comservice.productoAddedSubject.subscribe(this.observerListaProductos)
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