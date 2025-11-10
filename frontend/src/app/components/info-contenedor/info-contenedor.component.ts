import { Component, OnInit, OnDestroy, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-info-contenedor',
  templateUrl: './info-contenedor.component.html',
  styleUrls: ['./info-contenedor.component.css']
})
export class InfoContenedorComponent implements OnInit, OnDestroy {
  
  textoCompleto: string = [
    "¡Bienvenido/a a mi espacio de nutrición consciente! 🌱",
    "Aquí encontrarás todo lo necesario para tu bienestar:\n",
    " 📅 Agenda turnos para consultas personalizadas",
    " 🛍️ Compra productos naturales y suplementos",
    " 🥗 Descubre recetas divertidas y deliciosas",
    " 🎮 Y distraete por un rato en la sección de juegos!\n",
    " ❤️❤️❤️ "
  ].join('\n');

  textoVisible: string = '';

  private intervalo!: ReturnType<typeof setInterval>;
  private emotes = ['🍎', '🍏', '❤️', '🥦', '🍒', '🥑', '❤️', '🍇'];

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.escribirTexto();
    this.iniciarAnimacion();
  }

  ngOnDestroy(): void {
    if (this.intervalo) clearInterval(this.intervalo);
  }

  private escribirTexto() {
    this.textoVisible = '';
    let letra = 0;

    const intervaloTexto = setInterval(() => {
      if (letra < this.textoCompleto.length) {
        if (this.textoCompleto.charAt(letra) === '\n') {
          this.textoVisible += '<br>';
        } else {
          this.textoVisible += this.textoCompleto.charAt(letra);
        }
        letra++;
      } else {
        clearInterval(intervaloTexto);
      }
    }, 35);
  }

  private iniciarAnimacion(): void {
    const contenedor = this.el.nativeElement.querySelector('.fondo');
    if (!contenedor) return;

    this.intervalo = setInterval(() => {
      const emoji = this.renderer.createElement('span');
      this.renderer.addClass(emoji, 'emoji');
      emoji.textContent = this.emotes[Math.floor(Math.random() * this.emotes.length)];

      this.renderer.setStyle(emoji, 'left', `${Math.random() * 100}%`);
      this.renderer.setStyle(emoji, 'font-size', `${Math.random() * 5 + 6}px`);
      this.renderer.setStyle(emoji, 'animation-duration', `${Math.random() * 5 + 5}s`);
      this.renderer.setStyle(emoji, 'opacity', `${Math.random() * 0.8 + 0.5}`);
      this.renderer.setStyle(emoji, 'transform', `rotate(${Math.random() * 360}deg)`);

      this.renderer.appendChild(contenedor, emoji);
      setTimeout(() => this.renderer.removeChild(contenedor, emoji), 10000);
    }, 400);
  }
}
