import { Component, Output, EventEmitter, Input,  ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-separador-info',
  templateUrl: './separador-info.component.html',
  styleUrls: ['./separador-info.component.css']
})
export class SeparadorInfoComponent {
  @Input() activeSection: 'posts' | 'juegos' | 'turnos' | 'productos' = 'productos';
  @Output() sectionChange = new EventEmitter<'posts' | 'juegos' | 'turnos' | 'productos'>();

  @ViewChild('indicador') indicadorRef!: ElementRef<HTMLSpanElement>;
  
  ngAfterViewInit() {
    this.moverIndicador();
  }

  selectSection(section: 'posts' | 'juegos' | 'turnos' | 'productos') {
    this.activeSection = section;
    this.sectionChange.emit(section);
    this.moverIndicador();
  }

  moverIndicador() {
    setTimeout(() => {
      const activo = document.querySelector('.separador_button.active') as HTMLElement;
      const indicador = this.indicadorRef.nativeElement;
      if (activo && indicador) {
        const rect = activo.getBoundingClientRect();
        const parentRect = activo.parentElement!.getBoundingClientRect();
        indicador.style.left = `${rect.left - parentRect.left}px`;
        indicador.style.width = `${rect.width}px`;
      }
    });
  }
}
