import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router/';
import { FormsModule } from '@angular/forms';

import { ComponenteGrupoComponent } from './componente-grupo/componente-grupo.component';
import { ServicoGrupoService } from './servico-grupo.service';
import { ComponenteGrupoDetalheComponent } from './componente-grupo-detalhe/componente-grupo-detalhe.component';
import { ComponentePostsComponent } from './componente-posts/componente-posts.component';
import { ModuloMenuModule } from '../modulo-menu/modulo-menu.module';




@NgModule({
  imports: [
    CommonModule, ModuloMenuModule, RouterModule, FormsModule
  ],
  declarations: [ComponenteGrupoComponent, ComponenteGrupoDetalheComponent, ComponentePostsComponent],
  exports: [ComponenteGrupoComponent],
  providers: [ServicoGrupoService]
})
export class ModuloGrupoModule { }
