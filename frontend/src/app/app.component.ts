import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  
})
export class AppComponent {
  activeSection: 'posts' | 'juegos' | 'turnos' | 'productos' = 'posts';

  onSectionSelected(section: 'posts' | 'juegos' | 'turnos' | 'productos') {
    this.activeSection = section;
  }
}
