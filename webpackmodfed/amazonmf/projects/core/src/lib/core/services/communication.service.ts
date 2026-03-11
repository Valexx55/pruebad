import { Injectable } from '@angular/core';
import { ProductoEvent } from '@models';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  //arrayProductos!: ProductoEvent[]

  //no funciona bien, puede no escuchar desde el principio
  //productoAddedSubject = new Subject<ProductoEvent>()
  //funciona pero sólo nos transmite el último
  //si selecciono varios antes de iniciar la suscripción, se pierden los anteriores
  //productoAddedSubject = new BehaviorSubject<ProductoEvent|null>(null)//Union Type
  //funciona, nos da los 2 (N) últimos productos pero los anteriores se pierde
  productoAddedSubject = new ReplaySubject<ProductoEvent>(2)


  constructor() { 
    console.log("Instancia de ComService creada " + Math.random());
    //this.arrayProductos = []
  }

  emitirProductoAdded (producto: ProductoEvent)
  {
    this.productoAddedSubject.next(producto)
  }

}
