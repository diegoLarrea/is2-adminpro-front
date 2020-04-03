import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectoRolesComponent } from './proyecto-roles.component';

describe('ProyectoRolesComponent', () => {
  let component: ProyectoRolesComponent;
  let fixture: ComponentFixture<ProyectoRolesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProyectoRolesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProyectoRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
