import { TestBed } from '@angular/core/testing';

import { HypervergeService } from './hyperverge.service';

describe('HypervergeService', () => {
  let service: HypervergeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HypervergeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
