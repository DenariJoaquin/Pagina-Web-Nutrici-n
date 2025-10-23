import { Component, ViewChild, ElementRef } from '@angular/core';

interface Receta{
  imagen: string;
  nombre: string;
  link: string;
}

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


  botonVisible: number | null = null;

  recetas: Receta[] = [
    { imagen: '\\cocinera.png', nombre: 'cocinera', link: '' },
    { imagen: '\\post-avena.jpg', nombre: 'avena', link: 'https://link-receta-2.com' },
    { imagen: '\\post-trufas.jpg', nombre: 'trufas', link: 'https://link-receta-3.com' },
    { imagen: '\\post-panqueque.jpg', nombre: 'panqueque', link: 'https://link-receta-4.com' },
    { imagen: '\\post-tartazuchinni.jpg', nombre: 'tarta zuchinni', link: 'https://link-receta-5.com' },
    { imagen: '\\post-tortaintegral.jpg', nombre: 'torta integral', link: 'https://link-receta-6.com' },
    { imagen: '\\post-pepas-avena.jpg', nombre: 'pepas avena', link: 'https://link-receta-7.com' },
    { imagen: '\\post-zato.jpg', nombre: 'sopa', link: 'https://link-receta-8.com' },
    { imagen: '\\post-panqueques.jpg', nombre: 'panqueques', link: 'https://link-receta-9.com' },
    { imagen: '\\post-mermelada-frutosrojos.jpg', nombre: 'mermelada', link: 'https://link-receta-10.com' },
    { imagen: '\\post-tarta.jpg', nombre: 'tarta', link: 'https://link-receta-11.com' },
    { imagen: '\\nutricionistarecetas.png', nombre: 'proximamente', link: 'https://link-receta-12.com' }
  ];

  mostrarBoton(indice: number):void {
    this.botonVisible = indice;

    setTimeout(() => {
      if (this.botonVisible === indice) {
        this.botonVisible = null;
      }
    }, 5000);
  }

  



}


