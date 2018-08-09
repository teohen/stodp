import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponenteMenuComponent } from './componente-menu/componente-menu.component';
import { RouterModule } from '@angular/router/';
import { FormsModule } from '@angular/forms';
import { ComponenteSairComponent } from './componente-sair/componente-sair.component';

@NgModule({
  imports: [
    CommonModule, RouterModule, FormsModule
  ],
  declarations: [ComponenteMenuComponent, ComponenteSairComponent],
  exports: [ComponenteMenuComponent]
})
export class ModuloMenuModule { }
