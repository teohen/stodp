import { Injectable, group } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators/catchError';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Subject } from 'rxjs/Subject';

import { ServicoSocketService } from '../modulo-raiz/servico-socket.service';
import { Usuario } from '../modulo-usuario/usuario';
import { Grupo } from './grupo';
import { Post } from './post';


@Injectable()
export class ServicoGrupoService {
  mensagens: Subject<any>;
  private servidor: string = 'http://localhost:3000/grupos';
  private rota: string = '';
  private token: string = localStorage.getItem('token');
  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json', 'token': this.token})
  }

  constructor(private http: HttpClient) {}
  
  buscaTodos(): Observable<Grupo[]>{
    return this.http.get<Grupo[]>(this.getUrl("/"),this.httpOptions)
    .pipe(catchError(this.erro));
  }

  buscaGrupo(id: number): Observable<Grupo>{
    return this.http.get<Grupo>(this.getUrl("/" + id),this.httpOptions)
    .pipe(catchError(this.erro));
  }
  buscaPosts(grupo: Grupo): Observable<Post[]>{
    return this.http.get<Post[]>(this.getUrl("/" + grupo.getId() + "/posts"), this.httpOptions)
    .pipe(catchError(this.erro));
  }

  chat(grupo: Grupo){
    return this.http.get(this.getUrl("/chat/" + grupo.getId() + ""), this.httpOptions)
    .pipe(catchError(this.erro));
  }

  private getUrl(rota: string){
    return this.servidor + rota;
  }
  private erro(error: HttpErrorResponse){
    if (error.error instanceof ErrorEvent){
      console.log('um erro ocorreu no cliente', error.error.message);
    }else{
      switch(error.error.cod){
        case 201:
          return new ErrorObservable({titulo: 'chave duplicada', msg: 'Erro de chave duplicadada. Já existe um registro com o mesmo valor do campo "usuario"'});
        case 202:
          return new ErrorObservable({titulo: 'erro no login', msg: 'usuario ou senha incorreto(a)'});
        case 102:
          return new ErrorObservable({titulo: 'sessao inexistente', msg: 'não existe sessão'});
        case 204:
          return new ErrorObservable({titulo: 'permissão negada', msg: 'não há permissão para acessar essa área'});
        default:
          return new ErrorObservable({titulo: 'geral', msg: 'Erro interno. Por favor, tente novamente'});
      }
    }
  }
}
