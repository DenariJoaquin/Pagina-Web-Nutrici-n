import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PedidoService } from '../../services/pedido.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent {
  pedidos: any[] = [];

  constructor(private pedidoService: PedidoService, private router: Router) {}

  ngOnInit(): void {
    this.pedidoService.obtenerPedidos().subscribe({
      next: (data) => this.pedidos = data,
      error: (err) => console.error('Error al cargar pedidos:', err)
    });
  }

  volver() {
    this.router.navigate(['/perfil']);
  }
}