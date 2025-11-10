import { Component } from '@angular/core';
import { PedidoService } from '../../services/pedido.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})

export class CarritoComponent { 
  constructor(private pedidoService: PedidoService, private router: Router) { }
  confirmarCompra() {
    this.pedidoService.confirmarPedido().subscribe({
      next: (res) => {
        alert('¡Compra realizada con éxito!');
        this.router.navigate(['/pedidos']);
      },
      error: (err) => {
        console.error('Error al confirmar compra:', err);
        alert('No se pudo confirmar la compra');
      }
    });
  }
}
