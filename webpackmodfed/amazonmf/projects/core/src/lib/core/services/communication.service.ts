import { Injectable } from '@angular/core';
import { ProductoEvent } from '@models';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';


const STORAGE_KEY = 'carrito_productos';

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
  productoAddedSubject: BehaviorSubject<ProductoEvent[]>;// = new BehaviorSubject<ProductoEvent[]>([])

  //la lista mutable de los productos
  productos$:Observable<ProductoEvent[]>;// = this.productoAddedSubject.asObservable()

  constructor() { 
    console.log("Instancia de ComService creada " + Math.random());
    //this.arrayProductos = []
    //persistencia en local storage recuperamos el estado inicial
    let guardado = sessionStorage.getItem(STORAGE_KEY);
    let inicial: ProductoEvent[] = guardado ? JSON.parse(guardado) : [];

    this.productoAddedSubject = new BehaviorSubject<ProductoEvent[]>(inicial);
    this.productos$ = this.productoAddedSubject.asObservable()

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
    this.persistir();
    
  }

  persistir ()
  {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(this.productoAddedSubject.value));
  }
  //versión válidad hasta Replay
  /*
  emitirProductoAdded (producto: ProductoEvent)
  {
    this.productoAddedSubject.next(producto)
  }*/

    vaciarProductos ()
    {
      //reset de la lista de productos RAM
      this.productoAddedSubject.next([]);

      sessionStorage.removeItem(STORAGE_KEY);
    }

}
