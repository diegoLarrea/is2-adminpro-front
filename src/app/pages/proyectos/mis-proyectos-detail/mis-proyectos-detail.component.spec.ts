import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MisProyectosDetailComponent } from './mis-proyectos-detail.component';

describe('MisProyectosDetailComponent', () => {
  let component: MisProyectosDetailComponent;
  let fixture: ComponentFixture<MisProyectosDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisProyectosDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MisProyectosDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
