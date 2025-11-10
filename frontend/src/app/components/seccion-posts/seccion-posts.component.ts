import { Component, ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-seccion-posts',
  templateUrl: './seccion-posts.component.html',
  styleUrls: ['./seccion-posts.component.css']
})
export class SeccionPostsComponent {
  
  @ViewChild('carrusel', { static: false }) carrusel!: ElementRef<HTMLDivElement>;

  scrollLeft() {
    this.carrusel.nativeElement.scrollBy({ left: -300, behavior: 'smooth' });
  }

  scrollRight() {
    this.carrusel.nativeElement.scrollBy({ left: 300, behavior: 'smooth' });
  }

}


