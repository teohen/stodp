import { Injectable } from '@angular/core';
import * as Rx from 'rxjs/Rx';
import * as io from 'socket.io-client';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Post } from '../modulo-grupo/post';

@Injectable()
export class ServicoSocketService {
  private socket; 
  private url = 'http://localhost:3300';

  constructor() {
    this.socket = io(this.url);
   }
  enviarMensagem(post){
    this.socket.emit('post', post);
  }
  recebeMensagens(): Observable<Post>{
    let observable = new Observable<Post>(observer => {
      this.socket = io(this.url);
      this.socket.on('mensagem', (data) => {
        observer.next(data);
      });
      return () =>{
        this.socket.disconnect();
      }
    })
    return observable;
  }
}
