import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Grupo } from '../grupo';
import { ServicoGrupoService } from '../servico-grupo.service';
import { ServicoAutenticacaoService } from '../../modulo-raiz/servico-autenticacao.service';
import { ServicoSocketService } from '../../modulo-raiz/servico-socket.service';
import { Post } from '../post';



@Component({
  selector: 'app-componente-grupo-detalhe',
  templateUrl: './componente-grupo-detalhe.component.html',
  styleUrls: ['./componente-grupo-detalhe.component.css']
})
export class ComponenteGrupoDetalheComponent implements OnInit {
  private grupo: Grupo;
  private id: number;
  private posts: Post[];
  private post: Post;
  mensagens = [];
  conection;
  mensagem;

  constructor(private servicogrupo: ServicoGrupoService,
    private route: ActivatedRoute,
    private servicoAutenticacao: ServicoAutenticacaoService,
    private router: Router,
    private servicoWebSocket: ServicoSocketService) {
      this.grupo = new Grupo();
      this.post = new Post();
    
  }

  ngOnInit() {
    this.route.params.subscribe(
      data => {
        this.id = data.id;
      });
      this.grupo.setId(this.id);
      this.servicoAutenticacao.verificaParticipacaoEmGrupo(this.grupo).subscribe(
        data =>{
          this.servicogrupo.buscaGrupo(this.id).subscribe(
            data => {
              this.grupo.setId(data.id_grupo);
              this.grupo.setTema(data.tema;
              this.grupo.setTitulo(data.titulo);
            }, error => {
              console.log("dados do grupo", error);
            }
          );
          this.servicogrupo.buscaPosts(this.grupo).subscribe(
            data => {
              console.log(data);
              this.posts = data;
              this.servicoWebSocket.recebeMensagens().subscribe(data => {
                console.log(data);
                this.posts.push(data.post);
                this.post.setPost("");
              });
            },error =>{
              console.log("dados do post", error);
            });
        },error => {
          this.router.navigate(["/grupos"]);
          console.log("participacao no grupo", error);
        }
      );
  }
  enviar(){
    this.servicogrupo.chat(this.grupo).subscribe(
      data => {
        this.post.setIdGrupo(this.grupo.getId());
        this.post.setIdUsuario(data.idUsuario);
        this.servicoWebSocket.enviarMensagem(this.post);
    }, error => {
      console.log(error);
    });
  }
}