import { ProductoEvent } from "@models";
import { createAction, props } from "@ngrx/store";

// cada una de las acciones que provocan cambios en el estado queda definida dentro de este fichero 

export const agregarProducto = createAction (
    '[Carrito] AgregarProducto', //descricipción 
    props<{producto:ProductoEvent}>() //los datos que acompañan a la acción: el producto añadido
)


export const vaciarCarrito = createAction ('[Carrito] VaciarCarrito')