import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteGrupoComponent } from './componente-grupo.component';

describe('ComponenteGrupoComponent', () => {
  let component: ComponenteGrupoComponent;
  let fixture: ComponentFixture<ComponenteGrupoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponenteGrupoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponenteGrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
