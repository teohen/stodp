import { Component } from '@angular/core';
import { Usuario } from '../usuario';

import { ServicoUsuarioService } from '../servico-usuario.service';
import { Router } from '@angular/router';


@Component({
  selector: 'componente-login',
  templateUrl: './componente-login.component.html',
  styleUrls: ['./componente-login.component.css']
})
export class ComponenteLoginComponent {
  usuario: Usuario;
  rota: string = '/home';
  private loginFalhado: boolean = false;
  private mensagemErro: string;

  constructor(private servicoUsuario: ServicoUsuarioService,private router: Router) {
    this.usuario = new Usuario();
    this.mensagemErro = '';
  }

  login(){
    this.servicoUsuario.login(this.usuario).subscribe(
      data => {
        localStorage.setItem('token', data.token);
        this.router.navigate([this.rota]);
      },error => {
        console.log(error);
        this.mensagemErro = error.msg;
        this.loginFalhado = true;
      }
    );
  }
  logout(){
    this.servicoUsuario.logout().subscribe(
      data => {
        console.log(data);
      }, error => {
        console.log(error);
      }
    );
  }
  sessao(){
    console.log(localStorage.getItem('sessao'));
  }
  apagarSessao(){
    localStorage.clear();
  }
}
