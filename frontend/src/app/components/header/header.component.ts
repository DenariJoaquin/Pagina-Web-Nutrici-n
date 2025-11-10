import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  get estaLogueado(): boolean {
    return !!localStorage.getItem('token');
  }

  confirmarLogout() {
    const seguro = confirm('¿Seguro que querés cerrar sesión?');
    if (seguro) {
      this.authService.logout();
      this.router.navigate(['/login']);
    }
  }
}