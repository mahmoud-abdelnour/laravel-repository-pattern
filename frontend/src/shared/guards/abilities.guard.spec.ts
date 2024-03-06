import { TestBed } from '@angular/core/testing';

import { AbilitiesGuard } from './abilities.guard';

describe('AbilitiesGuard', () => {
  let guard: AbilitiesGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AbilitiesGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
