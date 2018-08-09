import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteSairComponent } from './componente-sair.component';

describe('ComponenteSairComponent', () => {
  let component: ComponenteSairComponent;
  let fixture: ComponentFixture<ComponenteSairComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponenteSairComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponenteSairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
