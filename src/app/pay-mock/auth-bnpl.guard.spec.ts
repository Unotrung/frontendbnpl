import { TestBed } from '@angular/core/testing';

import {AuthBnplGuard} from './auth-bnpl.guard';

describe('AuthGuard', () => {
  let guard: AuthBnplGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthBnplGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
