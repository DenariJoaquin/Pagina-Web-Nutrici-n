import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { InfoContenedorComponent } from './components/info-contenedor/info-contenedor.component';
import { SeparadorInfoComponent } from './components/separador-info/separador-info.component';
import { SeccionPostsComponent } from './components/seccion-posts/seccion-posts.component';
import { SeccionJuegosComponent } from './components/seccion-juegos/seccion-juegos.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductosComponent } from './components/productos/productos.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { PerfilComponent } from './components/perfil/perfil.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { CarritoComponent } from './components/carrito/carrito.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    InfoContenedorComponent,
    SeparadorInfoComponent,
    SeccionPostsComponent,
    SeccionJuegosComponent,
    FooterComponent,
    ProductosComponent,
    LoginComponent,
    RegisterComponent,
    AuthLayoutComponent,
    MainLayoutComponent,
    PerfilComponent,
    PedidosComponent,
    CarritoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    provideHttpClient(withInterceptorsFromDi())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
