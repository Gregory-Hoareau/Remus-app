import { TestBed } from '@angular/core/testing';

import { CrowdsourcingService } from './crowdsourcing.service';

describe('CrowdsourcingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CrowdsourcingService = TestBed.get(CrowdsourcingService);
    expect(service).toBeTruthy();
  });
});
