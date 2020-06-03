import { TestBed } from '@angular/core/testing';

import { CharacterService } from './character.service';
import { FileMock } from '@ionic-native-mocks/file';

describe('CharacterService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
    ]
  }));

  it('should be created', () => {
    const service: CharacterService = TestBed.get(CharacterService);
    expect(service).toBeTruthy();
  });
});
