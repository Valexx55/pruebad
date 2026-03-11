//Cuidado de no importar de la ruta 
//import { CommunicationService } from './../../../../../../core/src/lib/core/services/communication.service';
//Importar de la librería compartida en tscongif
import { CommunicationService } from '@core-lib';
import { Component, inject, OnInit } from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import { Producto } from '../../models/producto.model';
import { ProductoEvent } from '@models';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit{

  private productoService = inject(ProductosService);
  productos: Producto[] = [];

  comservice = inject(CommunicationService)


  ngOnInit(): void {
     this.productos = this.productoService.getProductos();
      console.log("Productos cargados")
  }

  agregarAlCarrito (p:Producto)
  {
    console.log(`Producto cargados ${p}`)

    let evento: ProductoEvent = {
      id: p.id,
      nombre: p.nombre,
      precio: p.precio,
      cantidad: 1
    }

    //this.comservice.emitirProductoAdded(evento)
    this.comservice.agregarProducto(evento)
    
    
  }
}