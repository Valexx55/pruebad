import { Routes } from '@angular/router';
import { Inicio } from './components/inicio/inicio';
import { Movimientos } from './components/movimientos/movimientos';

/**
 * este aRRAY de rutas es fundamental para angular 
 * cuando yo quiera navegar a una ruta está 
 * estará asociado a un componente 
 * de tal manera que se van a mantener asociados 
 * un string con un componente 
 * y es así como se hace la navegación con angulaR
 */

export const routes: Routes = [
    {path:'inicio', component: Inicio},
    {path:'movimientos', component: Movimientos}
];
