//definimos el estado inicial

import { ProductoEvent } from "@models";
import { createReducer, on } from "@ngrx/store";
import  * as CartActions from './cart.actions';

//en nuestro caso el estado es un array de productos
export interface CartState {
    productos: ProductoEvent[];
}

//el estado inicial de nuesta APP
export const initialState:CartState = {
    productos: []
}

//se define la reacción a las acciones (como transformamos el estado en uno nuevo)

export const cartReducer = createReducer (
    initialState, 
    on(CartActions.agregarProducto, (state, {producto}) => {
        //agregamos un producot y puede ser que exista o que no.
        //si ya existe, incrementamos cantidad. si no, creamos nueva entrada
        let existe = state.productos.find(p => p.id == producto.id);
        let productos = existe ?
        state.productos.map(p => p.id == producto.id ? {...p, cantidad: (p.cantidad ?? 1)+1} : p)
        :
        [...state.productos, {...producto, cantidad :1}];

        return{...state, productos}
    }),
    /*on(CartActions.vaciarCarrito, (state) => ({
        ...state,
        productos: []
    }))*/
    on(CartActions.vaciarCarrito, ()=>({productos:[]}))
)