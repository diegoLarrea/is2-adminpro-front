import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermisosRolSistemaComponent } from './permisos-rol-sistema.component';

describe('PermisosRolSistemaComponent', () => {
  let component: PermisosRolSistemaComponent;
  let fixture: ComponentFixture<PermisosRolSistemaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermisosRolSistemaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermisosRolSistemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
