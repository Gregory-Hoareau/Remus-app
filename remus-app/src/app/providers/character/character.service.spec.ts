import { TestBed } from '@angular/core/testing';

import { CharacterService } from './character.service';
import { FileMock } from '@ionic-native-mocks/file';
import { Component } from '@angular/core';
import { all_characters } from 'src/mocks/Character';

describe('CharacterService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
    ]
  }));

  it('should be created', () => {
    const service: CharacterService = TestBed.get(CharacterService);
    expect(service).toBeTruthy();
  });

  it('should delete characters from the list', ()=>{
    const service: CharacterService = TestBed.get(CharacterService);
    service.characters = all_characters;
    const toDel = service.characters[0];
    const initial = service.characters.length
    service.remove(toDel);
    expect(service.characters.length).toBe(initial-1)
    expect(service.characters.indexOf(toDel)).toBe(-1);
  });

});
