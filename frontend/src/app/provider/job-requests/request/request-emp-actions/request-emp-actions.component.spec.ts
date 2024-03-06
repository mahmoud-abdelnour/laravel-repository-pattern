import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestEmpActionsComponent } from './request-emp-actions.component';

describe('RequestEmpActionsComponent', () => {
  let component: RequestEmpActionsComponent;
  let fixture: ComponentFixture<RequestEmpActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestEmpActionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestEmpActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
