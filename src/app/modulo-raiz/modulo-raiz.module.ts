import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponenteHomeComponent } from './componente-home/componente-home.component';
import { ServicoAutenticacaoService } from './servico-autenticacao.service';
import { ModuloGrupoModule } from '../modulo-grupo/modulo-grupo.module';
import { ComponenteGrupoComponent } from '../modulo-grupo/componente-grupo/componente-grupo.component';
import { ModuloMenuModule } from '../modulo-menu/modulo-menu.module';
import { ServicoSocketService } from './servico-socket.service';


@NgModule({
  imports: [
    CommonModule, ModuloGrupoModule, ModuloMenuModule
  ],
  declarations: [ComponenteHomeComponent],
  exports: [ComponenteHomeComponent],
  providers: [ServicoAutenticacaoService, ServicoSocketService]
})
export class ModuloRaizModule { }
