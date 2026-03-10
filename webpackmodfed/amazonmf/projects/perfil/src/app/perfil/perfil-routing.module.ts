import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerfilComponent } from './components/perfil/perfil.component';


//perfil-routing.module.ts decide qué componente o subruta se muestra dentro de ese módulo
const routes: Routes = [
  {
    path:'',
    component:PerfilComponent
  }
  //{ path: 'editar', component: EditarPerfilComponent }
  //perfil/editar    → EditarPerfilComponent
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerfilRoutingModule { }
