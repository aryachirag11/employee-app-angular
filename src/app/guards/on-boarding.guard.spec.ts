import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { onBoardingGuard } from './on-boarding.guard';

describe('onBoardingGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => onBoardingGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
