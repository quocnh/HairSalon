import { TestBed } from '@angular/core/testing';

import { SalonUtilsService } from './salon-utils.service';

describe('SalonUtilsService', () => {
  let service: SalonUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalonUtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
