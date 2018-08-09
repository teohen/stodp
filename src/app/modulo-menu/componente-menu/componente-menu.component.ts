import { Component, OnInit, Input} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServicoAutenticacaoService } from '../../modulo-raiz/servico-autenticacao.service';

@Component({
  selector: 'app-componente-menu',
  templateUrl: './componente-menu.component.html',
  styleUrls: ['./componente-menu.component.css']
})
export class ComponenteMenuComponent implements OnInit {
  private rota: string;
  constructor(private router: Router, private servicoAutenticacao: ServicoAutenticacaoService, private route: ActivatedRoute) {

  }
  ngOnInit() {
    this.servicoAutenticacao.verificaSessao().subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
        this.router.navigate(['/']);
      });
      this.route.url.subscribe(        
        url =>{
          this.rota = url[0].path;
        }
      );
  }
  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}