import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResignsComponent } from './resigns.component';

describe('ResignsComponent', () => {
  let component: ResignsComponent;
  let fixture: ComponentFixture<ResignsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResignsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResignsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
