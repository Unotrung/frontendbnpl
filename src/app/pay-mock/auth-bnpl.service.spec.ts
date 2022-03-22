import { TestBed } from '@angular/core/testing';

import { AuthBnplService } from './auth-bnpl.service';

describe('AuthBnplService', () => {
  let service: AuthBnplService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthBnplService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
