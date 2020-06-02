import { TestBed } from '@angular/core/testing';

import { AchivementService } from './achivement.service';

describe('AchivementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AchivementService = TestBed.get(AchivementService);
    expect(service).toBeTruthy();
  });
});
