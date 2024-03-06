import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantActionsComponent } from './applicant-actions.component';

describe('ApplicantActionsComponent', () => {
  let component: ApplicantActionsComponent;
  let fixture: ComponentFixture<ApplicantActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicantActionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicantActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
