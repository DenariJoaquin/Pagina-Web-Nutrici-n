import { Component } from '@angular/core';
import  {jwtDecode}  from 'jwt-decode';
import { Router } from '@angular/router';
interface DecodedToken {
  id: number;
  email: string;
  nombre: string;
  rol: string;
}

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {
  usuario: DecodedToken | null = null;
  constructor(private router: Router) {}

  volver() {
    this.router.navigate(['/productos']);
  }
  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode<DecodedToken>(token);
      console.log('🔍 Token decodificado:', decoded);
      this.usuario = decoded;
    }
  }
}
