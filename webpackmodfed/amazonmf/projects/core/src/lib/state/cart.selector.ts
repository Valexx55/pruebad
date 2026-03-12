
//vamos a definir las funciones de suscripción para actualizar la UI / Componente

import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CartState } from "./cart.reducer";

//aplicando redux puedo tener el estado de varios negocios/procesos/conjuntos de datos
//es necesario diferenciarlos, para poder acceder al que me interesa
//en nuestro, defininos cartState sería el subconjunto de datos de nuestro negocio o slice/feature

export const selectCartState = createFeatureSelector<CartState>('carrito')//este 'carrito' hace de id, lo veremos luego en la carga del módulo de configuración

//vamos a definir las funciones de suscripción para actualizar la UI / Componente

export const selectProductos = createSelector (
    selectCartState,//el slice de nuestro interés
    state => state.productos //los datos que extraigo
)

//TODO: planteamos añadir 2 nuevos selectores uno para el total de importe de artículos en carrito y otro para el total de unidades en el carrito