import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError } from 'rxjs/operators';
import { Usuario } from '../modulo-usuario/usuario';
import { Grupo } from '../modulo-grupo/grupo';

@Injectable()
export class ServicoAutenticacaoService {
  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json', 'token': localStorage.getItem('token')})
  }
  private servidor: string = 'http://localhost:3000/autenticacao';

  constructor(private http: HttpClient) {}

  verificaSessao(){
    let token: string = localStorage.getItem('token');
    if(token == undefined){
      token = "nada";
    }
    let httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'token': token})
    }
    return this.http.get<any>(this.servidor, httpOptions)
    .pipe(catchError(this.erro));
  }
  verificaParticipacaoEmGrupo(grupo: Grupo){
    return this.http.get<any>(this.servidor + "/grupo/" + grupo.getId(), this.httpOptions)
    .pipe(catchError(this.erro));
  }

  private erro(error: HttpErrorResponse){
    if (error.error instanceof ErrorEvent){
      console.log('um erro ocorreu no cliente', error.error.message);
    }else{
      switch(error.error.cod){
        case 203:
          return new ErrorObservable({titulo: 'sessao inexistente', msg: 'necessário fazer login'});
        case 204:
          return new ErrorObservable({titulo: 'permissão negada', msg: 'não há permissão para acessar essa área'});
        default:
          return new ErrorObservable({titulo: 'geral', msg: 'Erro interno. Por favor, tente novamente'});
      }
    }
  }
}