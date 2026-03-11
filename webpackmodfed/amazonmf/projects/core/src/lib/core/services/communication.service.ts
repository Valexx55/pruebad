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
  //productoAddedSubject = new ReplaySubject<ProductoEvent>(2)
  productoAddedSubject = new BehaviorSubject<ProductoEvent[]>([])

  //la lista mutable de los productos
  productos$ = this.productoAddedSubject.asObservable()

  constructor() { 
    console.log("Instancia de ComService creada " + Math.random());
    //this.arrayProductos = []
  }


  agregarProducto (productoEvent: ProductoEvent)
  {

    //tratamiiento de duplicados
    let listaActual = this.productoAddedSubject.value;
    //si existe ya ese prodyucto
    let indice = listaActual.findIndex(p=> p.id==productoEvent.id);

    if (indice>-1)
    {
      //existe ya en la lista ese producto, incrementamos
      listaActual[indice].cantidad = (listaActual[indice].cantidad || 1)+1
      this.productoAddedSubject.next([...listaActual])//hacemos un nuevo array (nueva dirección) para que se tx el cambio
    } else {
      //añadimos uno nuevo
      this.productoAddedSubject.next([...listaActual, {...productoEvent, cantidad:1}])
    }

    
  }
  //versión válidad hasta Replay
  /*
  emitirProductoAdded (producto: ProductoEvent)
  {
    this.productoAddedSubject.next(producto)
  }*/

}
