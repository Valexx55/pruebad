import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CommunicationService } from '@core-lib';
import { ProductoEvent } from '@models';
import { map } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [CommonModule]
})
export class HeaderComponent {


  comunicacion = inject(CommunicationService);


  totalItems$ = this.comunicacion.productos$.pipe(
    map((lista: ProductoEvent[]) => lista.reduce((acc, p) => acc + (p.cantidad ?? 1), 0))
  );

}
