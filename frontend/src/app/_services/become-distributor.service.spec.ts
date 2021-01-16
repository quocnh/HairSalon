import { TestBed } from '@angular/core/testing';

import { BecomeDistributorService } from './become-distributor.service';

describe('BecomeDistributorService', () => {
  let service: BecomeDistributorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BecomeDistributorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
