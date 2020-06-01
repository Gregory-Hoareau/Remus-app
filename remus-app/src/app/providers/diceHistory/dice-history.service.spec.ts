import { TestBed } from '@angular/core/testing';

import { DiceHistoryService } from './dice-history.service';

describe('DiceHistoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DiceHistoryService = TestBed.get(DiceHistoryService);
    expect(service).toBeTruthy();
  });
});
