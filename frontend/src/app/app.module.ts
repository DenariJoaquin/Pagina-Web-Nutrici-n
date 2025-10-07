import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { InfoContenedorComponent } from './components/info-contenedor/info-contenedor.component';
import { SeparadorInfoComponent } from './components/separador-info/separador-info.component';
import { SeccionPostsComponent } from './components/seccion-posts/seccion-posts.component';
import { SeccionJuegosComponent } from './components/seccion-juegos/seccion-juegos.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    InfoContenedorComponent,
    SeparadorInfoComponent,
    SeccionPostsComponent,
    SeccionJuegosComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule  
  ],
  providers: [provideHttpClient(withInterceptorsFromDi())],
  bootstrap: [AppComponent]
})
export class AppModule { }
