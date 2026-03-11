import { PerfilModule } from './../../../perfil/src/app/perfil/perfil.module';
import { CarritoModule } from './../../../carrito/src/app/carrito/carrito.module';
import { ProductosModule } from './../../../productos/src/app/productos/productos.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//productos/Module donde productos es el micro remoto y Module lo que quiero de ese micro 
//y webpack config le dice donde encontrarlo

const routes: Routes = [
  {path: 'productos', loadChildren: () => import('productos/Module').then(m => m.ProductosModule)},
  {path: 'carrito', loadChildren: () => import('carrito/Module').then(m => m.CarritoModule)},
  {path: 'perfil', loadChildren: () => import('perfil/Module').then(m => m.PerfilModule)},
  { path: '**', redirectTo: '' },//cargar la página de inicio del shell app component
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
