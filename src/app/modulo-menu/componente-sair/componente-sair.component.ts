import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router/';

@Component({
  selector: 'app-componente-sair',
  templateUrl: './componente-sair.component.html',
  styleUrls: ['./componente-sair.component.css']
})
export class ComponenteSairComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

}
