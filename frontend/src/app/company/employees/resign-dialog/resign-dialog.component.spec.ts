import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResignDialogComponent } from './resign-dialog.component';

describe('ResignDialogComponent', () => {
  let component: ResignDialogComponent;
  let fixture: ComponentFixture<ResignDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResignDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResignDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
