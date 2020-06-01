import { TestBed } from '@angular/core/testing';

import { MacroService } from './macro.service';

describe('MacroService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MacroService = TestBed.get(MacroService);
    expect(service).toBeTruthy();
  });
});
