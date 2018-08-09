import { Component, OnInit } from '@angular/core';

import { Usuario } from '../usuario';
import { ServicoUsuarioService } from '../servico-usuario.service';

@Component({
  selector: 'app-componente-cadastro',
  templateUrl: './componente-cadastro.component.html',
  styleUrls: ['./componente-cadastro.component.css']
})
export class ComponenteCadastroComponent{
  usuario: Usuario;
  private usuarios: Usuario[];
  private cadastroFalhado: boolean = false;
  private cadastroSucesso: boolean = false;
  private messagemErro: string;

  constructor(private servicoUsuario: ServicoUsuarioService) { 
    this.usuario = new Usuario();
    this.messagemErro = '';
  }
  cadastrar(){
    this.servicoUsuario.cadastrar(this.usuario).subscribe(
      data => {
          this.cadastroFalhado = false;
          this.cadastroSucesso = true;
      }, error => {
        this.messagemErro = error.msg;
        this.cadastroFalhado = true;
        this.cadastroSucesso = false;
      });
  }

}
