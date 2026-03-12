import { ProductoEvent } from './../../../../../../models/src/lib/models/producto-event';
import { Component, HostListener, inject, OnInit } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';
import { CommunicationService, selectProductos } from '@core-lib';
import { map, Observable, Observer, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit{
  

    //inyectamos el Store para acceder al selector
    store:Store = inject(Store);

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

  productos$ = this.comservice.productos$;//productos RxJS
  productosNgRx$ = this.store.select(selectProductos)
  total$!:Observable<number>

  
  ngOnInit(): void {
   // this.cargarCarrito();//cargábamos una lista de mentira del servicio versión inicial
    this.total$ = this.productos$.
                  pipe
                  (
                    map(
                      productos => 
                      {
                         return productos.reduce((acc, p)=> acc + p.precio * (p.cantidad ?? 1), 0)
                       }
                      )
                  )

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

  /*vaciarCarrito() {
    this.carritoService.vaciarCarrito();
    this.cargarCarrito();
  }*/

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


 /**
   * f5 - refrsco
   * Antes de que se recargue la página, se muestra un aviso
   * para recordar al usuario, que en caso de proceder
   * se pierden los datos
   * @param event RECARGA
   */
  /*@HostListener('window:beforeunload', ['$event'])
  avisoRecarga(event: BeforeUnloadEvent) {
    event.preventDefault();
    //event.returnValue = '';
  }*/

  vaciarCarrito()
  {
    this.comservice.vaciarProductos()
  }

}