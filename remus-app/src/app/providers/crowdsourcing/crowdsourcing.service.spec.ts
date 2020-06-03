import { TestBed } from '@angular/core/testing';

import { CrowdsourcingService } from './crowdsourcing.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CrowdsourcingService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
    ]
  }));

  it('should be created', () => {
    const service: CrowdsourcingService = TestBed.get(CrowdsourcingService);
    expect(service).toBeTruthy();
  });
});
