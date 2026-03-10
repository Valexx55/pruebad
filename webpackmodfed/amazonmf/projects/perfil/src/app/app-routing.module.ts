import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//app-routing --> a que módulo entramos inicialmente router de módulos -NO stand alone / NgModule-

const routes: Routes = [
  // Página por defecto (AppComponent mostrará el template original)
  { path: '', pathMatch: 'full', redirectTo: '' },

  // Ruta a tu módulo de Perfil -- lazy loading
  { path: 'perfil', loadChildren: () => import('./perfil/perfil.module').then(m => m.PerfilModule) },

  // Ruta comodín opcional
  { path: '**', redirectTo: '' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
