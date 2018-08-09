import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ModuloUsuarioModule } from './modulo-usuario/modulo-usuario.module';
import { routing } from './app.routing';
import { ModuloRaizModule } from './modulo-raiz/modulo-raiz.module';
import { ModuloGrupoModule } from './modulo-grupo/modulo-grupo.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ModuloUsuarioModule,
    routing,
    ModuloRaizModule,
    ModuloGrupoModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
