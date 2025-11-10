import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  constructor(private http: HttpClient) { }

  obtenerPedidos() {
    return this.http.get<any[]>('/api/pedidos'); // El interceptor ya envía el token
  }

  confirmarPedido() {
    return this.http.post('/api/pedidos/confirmar', {});
  }

}
