import { TestBed } from '@angular/core/testing';

import { CustomerInformationService } from './customer-information.service';

describe('CustomerInformationService', () => {
  let service: CustomerInformationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerInformationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
