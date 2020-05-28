import { Injectable } from '@angular/core';
import { CharacterSheet } from 'src/app/models/character-sheet.model';
import { all_characters } from 'src/mocks/character'

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  private empty_characters: CharacterSheet = {
    img: null,
    name: '',
    age: -1,
    sex: '',
    background: '',
    traits: [{
      name: 'Force',
      value: -1,
    }, {
      name: 'Endurance',
      value: -1,
    }, {
      name: 'Intelligence',
      value: -1,
    }, {
      name: 'Perception',
      value: -1,
    }, {
      name: 'Charisme',
      value: -1,
    }, {
      name: 'Dextérité',
      value: -1,
    }],
    skills: [
        'Conduite',
        'Instinct animal',
        'Bagarre',
    ]
  };

  characters: CharacterSheet[] = all_characters;

  constructor() {}

  getCharacter(index = -1) {
    console.log('Want Character at: ' + index)
    if (index === -1) { // Se la personne qui envoie la requête n'est pas le MJ
      if (this.characters.length === 0) {
        const newChar = {...this.empty_characters}
        this.characters.push(newChar);
        return newChar;
      } else {
        return this.characters[0];
      }
    } else if (index === null) { // Si le MJ veut créer une nouveau PNJ
      const newChar = {...this.empty_characters}
      this.characters.push(newChar);
      return newChar;
    } else {
      return this.characters[index];
    }
  }

}
