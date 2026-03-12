import { inject, Injectable } from '@angular/core';
import { ProductoEvent } from '@models';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import * as CartActions from '../../state/cart.actions';


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

  //inyectamos el Store para poder disparar la acción
  store:Store = inject(Store);

  constructor() { 
    console.log("Instancia de ComService creada " + Math.random());
    //this.arrayProductos = []
    //persistencia en local storage recuperamos el estado inicial
    //let guardado = sessionStorage.getItem(STORAGE_KEY);
    //let guardado = localStorage.getItem(STORAGE_KEY);
    let inicial: ProductoEvent[] = CommunicationService.recuperarEstadoProductos();

    this.productoAddedSubject = new BehaviorSubject<ProductoEvent[]>(inicial);
    this.productos$ = this.productoAddedSubject.asObservable()

  }

  static recuperarEstadoProductos () : ProductoEvent[]
  {
    let inicial: ProductoEvent[] = []; 
    
      let guardado = localStorage.getItem(STORAGE_KEY);
      inicial = guardado ? JSON.parse(guardado) : [];
    
      return inicial;
  }


  agregarProducto (productoEvent: ProductoEvent)
  {

    //tratamiiento de duplicados
    let listaActual = this.productoAddedSubject.value;
    //si existe ya ese prodyucto
    let indice = listaActual.findIndex(p=> p.id==productoEvent.id);

    //rxjs
    if (indice>-1)
    {
      //existe ya en la lista ese producto, incrementamos
      listaActual[indice].cantidad = (listaActual[indice].cantidad || 1)+1
      this.productoAddedSubject.next([...listaActual])//hacemos un nuevo array (nueva dirección) para que se tx el cambio
    } else {
      //añadimos uno nuevo
      this.productoAddedSubject.next([...listaActual, {...productoEvent, cantidad:1}])
    }
    //localstorage
    this.persistir();
    //ngrx
    this.store.dispatch(CartActions.agregarProducto({producto:productoEvent}));
    
  }

  persistir ()
  {
    //sessionStorage.setItem(STORAGE_KEY, JSON.stringify(this.productoAddedSubject.value));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.productoAddedSubject.value));
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
      this.productoAddedSubject.next([]);//vacíamos productos del RxJs

      sessionStorage.removeItem(STORAGE_KEY);//vaciar productos del localStorage

      //ngrx
      this.store.dispatch(CartActions.vaciarCarrito());
    
    }

    eliminarProducto(id: number) {
    // RxJS: quitamos el producto del BehaviorSubject
    const listaActual = this.productoAddedSubject.value;
    const nuevaLista = listaActual.filter(p => p.id !== id);
    this.productoAddedSubject.next(nuevaLista);

    // Persistencia
    this.persistir();

    // NgRx: acción para eliminar del store
    this.store.dispatch(CartActions.eliminarProducto({ id }));
  }

}
