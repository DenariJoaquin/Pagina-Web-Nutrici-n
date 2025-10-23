import { Injectable } from '@angular/core';
import { Producto } from './producto.service';

@Injectable({
  providedIn: 'root'
})

export class CarritoService {
  private carrito: Producto[] = [];
  
  agregar(producto: Producto): void {
    this.carrito.push(producto);
    console.log(`Producto agregado al carrito: ${producto.nombre}`);
  }

  obtenerCarrito(): Producto[] {
    return this.carrito;
  }

  vaciarCarrito(): void {
    this.carrito = [];
    console.log('Carrito vaciado');
  }

}
