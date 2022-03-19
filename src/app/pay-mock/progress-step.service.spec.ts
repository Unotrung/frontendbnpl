import { TestBed } from '@angular/core/testing';

import { ProgressStepService } from './progress-step.service';

describe('ProgressStepService', () => {
  let service: ProgressStepService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgressStepService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
