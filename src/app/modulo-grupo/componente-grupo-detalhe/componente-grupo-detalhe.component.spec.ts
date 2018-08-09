import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteGrupoDetalheComponent } from './componente-grupo-detalhe.component';

describe('ComponenteGrupoDetalheComponent', () => {
  let component: ComponenteGrupoDetalheComponent;
  let fixture: ComponentFixture<ComponenteGrupoDetalheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponenteGrupoDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponenteGrupoDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
