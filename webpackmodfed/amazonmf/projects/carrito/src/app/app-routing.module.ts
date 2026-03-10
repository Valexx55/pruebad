import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // Página inicial del microcarrito (AppComponent muestra su HTML principal)
  { path: '', pathMatch: 'full', redirectTo: '' },

  // Subruta para cargar el módulo de carrito
  { path: 'carrito', loadChildren: () => import('./carrito/carrito.module').then(m => m.CarritoModule) },

  // Ruta comodín opcional
  { path: '**', redirectTo: '' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
