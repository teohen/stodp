import { Component, OnInit } from '@angular/core';

import { ServicoGrupoService } from '../servico-grupo.service';
import { Grupo } from '../grupo';

@Component({
  selector: 'app-componente-grupo',
  templateUrl: './componente-grupo.component.html',
  styleUrls: ['./componente-grupo.component.css']
})

export class ComponenteGrupoComponent implements OnInit {
  private grupos: Grupo[];
  constructor(private servicoGrupo: ServicoGrupoService) { 
    
  }
  ngOnInit() {
    this.servicoGrupo.buscaTodos().subscribe(
      data => {
        console.log(data);
        this.grupos = data;
      }, error => {
        console.log(error);
      }
    );
  }

}
