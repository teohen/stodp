import { Component, OnInit } from '@angular/core';
import { ServicoAutenticacaoService } from '../servico-autenticacao.service';
import { Router } from '@angular/router/';

@Component({
  selector: 'app-componente-home',
  templateUrl: './componente-home.component.html',
  styleUrls: ['./componente-home.component.css']
})
export class ComponenteHomeComponent implements OnInit {

  constructor(private servicoAutenticacao: ServicoAutenticacaoService, private router: Router) { }

  ngOnInit() {
    /*this.servicoAutenticacao.verificaSessao().subscribe(
      data => {
        console.log(data);
      }, error => {
          alert(error.msg);
          this.router.navigate(['/login']);
      }
    );
    */
  }

}
