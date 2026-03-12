//vamos a definir las funciones de suscripción para actualizar la UI / Componente

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState } from './cart.reducer';
import { ProductoEvent } from '@models';

//aplicando redux puedo tener el estado de varios negocios/procesos/conjuntos de datos
//es necesario diferenciarlos, para poder acceder al que me interesa
//en nuestro, defininos cartState sería el subconjunto de datos de nuestro negocio o slice/feature

export const selectCartState = createFeatureSelector<CartState>('carrito'); //este 'carrito' hace de id, lo veremos luego en la carga del módulo de configuración

//vamos a definir las funciones de suscripción para actualizar la UI / Componente

export const selectProductos = createSelector(
  selectCartState, //el slice de nuestro interés
  (state) => state.productos, //los datos que extraigo
);

//TODO: planteamos añadir 2 nuevos selectores uno para el total de importe de artículos en carrito y otro para el total de unidades en el carrito
export const selectPrecioTotal = createSelector(
  selectCartState, //el slice de nuestro interés
  (state) =>
    state.productos.reduce((acc: number, p: ProductoEvent) => {
      let precio = p.precio;
      let subtotal = precio * (p.cantidad ?? 1);//Nullish Coalescing Operator https://www.typescriptlang.org/play/?#example/nullish-coalescing
      return acc + subtotal;
    }, 0), //los datos que extraigo
);

/*
export const selectPrecioTotal = createSelector (
    selectCartState, 
    state =>
    state.productos.reduce((acc, p) => acc + p.precio * (p.cantidad ?? 1), 0)
)
*/

export const selectTotalItems = createSelector(
  selectCartState, //el slice de nuestro interés
  (state) =>
    state.productos.reduce((acc: number, p: ProductoEvent) => {
      //let precio = p.precio;
      let subtotalItems = acc + (p.cantidad ?? 1);
      return subtotalItems;
    }, 0), //los datos que extraigo
);