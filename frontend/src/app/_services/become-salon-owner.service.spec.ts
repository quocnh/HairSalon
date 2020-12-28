import { TestBed } from '@angular/core/testing';

import { BecomeSalonOwnerService } from './become-salon-owner.service';

describe('BecomeSalonOwnerService', () => {
  let service: BecomeSalonOwnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BecomeSalonOwnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
