import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteLoginComponent } from './componente-login.component';

describe('ComponenteLoginComponent', () => {
  let component: ComponenteLoginComponent;
  let fixture: ComponentFixture<ComponenteLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponenteLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponenteLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
