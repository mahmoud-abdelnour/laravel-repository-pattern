import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantsNumberComponent } from './applicants-number.component';

describe('ApplicantsNumberComponent', () => {
  let component: ApplicantsNumberComponent;
  let fixture: ComponentFixture<ApplicantsNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicantsNumberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicantsNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
