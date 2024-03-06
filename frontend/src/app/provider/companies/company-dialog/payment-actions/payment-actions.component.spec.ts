import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentActionsComponent } from './payment-actions.component';

describe('PaymentActionsComponent', () => {
  let component: PaymentActionsComponent;
  let fixture: ComponentFixture<PaymentActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentActionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
