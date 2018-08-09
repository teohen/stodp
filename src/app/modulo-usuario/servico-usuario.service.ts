import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Usuario } from './usuario';
import 'rxjs/Rx';
import { HttpHeaders } from '@angular/common/http';
import { error } from 'selenium-webdriver';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError } from 'rxjs/operators/catchError';
 
@Injectable()
export class ServicoUsuarioService {
  private servidor: string = 'http://localhost:3000/usuarios';
  private rota: string = '';
  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  constructor(private http: HttpClient) { }
  private getUrl(rota: string){
    return this.servidor + rota;
  }
  getUsuarios(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.getUrl(''))
    .pipe(catchError(this.erro));
  }
  cadastrar(usuario: Usuario): Observable<Usuario>{
    return this.http.post<Usuario>(this.getUrl('/novo'), usuario, this.httpOptions)
    .pipe(catchError(this.erro));
  }
  login(usuario: Usuario){
    return this.http.post<Usuario>(this.getUrl('/autenticacao/login'), usuario, this.httpOptions)
    .pipe(catchError(this.erro));
  }
  logout(){
    localStorage.removeItem('idUsuario');
    return this.http.get<Usuario>(this.getUrl('/logout'), this.httpOptions).pipe(catchError(this.erro));
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
        case 203:
          return new ErrorObservable({titulo: 'sessao inexistente', msg: 'não existe sessão'});
        default:
          return new ErrorObservable({titulo: 'geral', msg: 'Erro interno. Por favor, tente novamente'});
      }
    }
  }
}
