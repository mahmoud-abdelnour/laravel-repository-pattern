import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesChipsComponent } from './roles-chips.component';

describe('RolesChipsComponent', () => {
  let component: RolesChipsComponent;
  let fixture: ComponentFixture<RolesChipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RolesChipsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RolesChipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
