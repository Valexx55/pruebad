import { Component, inject, OnInit } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit{
  

  private carritoService = inject(CarritoService)

  carrito: any[] = [];
  total = 0;

  
  ngOnInit(): void {
    this.cargarCarrito();
  }
  
  cargarCarrito() {
    this.carrito = this.carritoService.obtenerCarrito();
    this.total = this.carritoService.getTotal();
  }

  vaciarCarrito() {
    this.carritoService.vaciarCarrito();
    this.cargarCarrito();
  }

  /**
   * hacemos una mejora para que en caso de que cambie un elemento de 
   * la lista y haya que repintarlo no se repinten todos sino que se lo actualizo los alimentos que cambiaron realmente reutilizando el resto
   * @param _index 
   * @param item 
   * @returns 
   */
  trackById(_index: number, item: any): number {
  return item.id;
}

}