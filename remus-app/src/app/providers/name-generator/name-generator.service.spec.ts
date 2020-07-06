import { TestBed } from '@angular/core/testing';

import { NameGeneratorService } from './name-generator.service';

describe('NameGeneratorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NameGeneratorService = TestBed.get(NameGeneratorService);
    expect(service).toBeTruthy();
  });
});
