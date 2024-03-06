import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptRejectNominantComponent } from './accept-reject-nominant.component';

describe('AcceptRejectNominantComponent', () => {
  let component: AcceptRejectNominantComponent;
  let fixture: ComponentFixture<AcceptRejectNominantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcceptRejectNominantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcceptRejectNominantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
