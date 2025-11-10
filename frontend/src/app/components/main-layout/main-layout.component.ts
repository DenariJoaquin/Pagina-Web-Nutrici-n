import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {
  activeSection: 'posts' | 'juegos' | 'turnos' | 'productos' = 'productos';

  constructor(private router: Router) {}

  onSectionSelected(section: 'posts' | 'juegos' | 'turnos' | 'productos') {
    this.activeSection = section;
    this.router.navigate([`/${section}`]);
  }
}
