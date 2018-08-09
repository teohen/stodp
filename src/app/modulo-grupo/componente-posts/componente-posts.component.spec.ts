import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentePostsComponent } from './componente-posts.component';

describe('ComponentePostsComponent', () => {
  let component: ComponentePostsComponent;
  let fixture: ComponentFixture<ComponentePostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentePostsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentePostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
