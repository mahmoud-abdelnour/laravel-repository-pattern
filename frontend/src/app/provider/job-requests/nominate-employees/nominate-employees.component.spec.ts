import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NominateEmployeesComponent } from './nominate-employees.component';

describe('NominateEmployeesComponent', () => {
  let component: NominateEmployeesComponent;
  let fixture: ComponentFixture<NominateEmployeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NominateEmployeesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NominateEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
