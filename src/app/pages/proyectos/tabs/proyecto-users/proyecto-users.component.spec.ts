import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectoUsersComponent } from './proyecto-users.component';

describe('ProyectoUsersComponent', () => {
  let component: ProyectoUsersComponent;
  let fixture: ComponentFixture<ProyectoUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProyectoUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProyectoUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
