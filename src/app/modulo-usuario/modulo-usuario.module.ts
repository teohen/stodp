import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { ComponenteLoginComponent } from './componente-login/componente-login.component';
import { ComponenteCadastroComponent } from './componente-cadastro/componente-cadastro.component';
import { ServicoUsuarioService } from './servico-usuario.service';


@NgModule({
  imports: [
    CommonModule, 
    FormsModule,
    HttpClientModule,
    RouterModule
  ],
  declarations: [ComponenteLoginComponent, ComponenteCadastroComponent],
  exports: [ComponenteLoginComponent, ComponenteCadastroComponent],
  providers: [ServicoUsuarioService]
})
export class ModuloUsuarioModule { }
