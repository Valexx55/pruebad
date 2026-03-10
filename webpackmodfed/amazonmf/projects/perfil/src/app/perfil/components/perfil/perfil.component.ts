import { Component, inject } from '@angular/core';
import { Perfil } from '../../models/perfil.model';
import { PerfilService } from '../../services/perfil.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {

  private perfilService = inject(PerfilService);
  perfil:Perfil;

  constructor (/*private perfilService:PerfilService*/)
  {
   this.perfil = this.perfilService.getPerfil() 
  }
}
