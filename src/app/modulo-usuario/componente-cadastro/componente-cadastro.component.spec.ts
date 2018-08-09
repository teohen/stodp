import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteCadastroComponent } from './componente-cadastro.component';

describe('ComponenteCadastroComponent', () => {
  let component: ComponenteCadastroComponent;
  let fixture: ComponentFixture<ComponenteCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponenteCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponenteCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
