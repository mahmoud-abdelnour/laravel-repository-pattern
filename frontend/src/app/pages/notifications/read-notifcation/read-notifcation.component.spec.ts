import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadNotifcationComponent } from './read-notifcation.component';

describe('ReadNotifcationComponent', () => {
  let component: ReadNotifcationComponent;
  let fixture: ComponentFixture<ReadNotifcationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadNotifcationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadNotifcationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
