import { Injectable } from '@angular/core';
import { CharacterSheet, DnDCharacterSheet, WoDCharacterSheet, AventureCharacterSheet, WtACharacterSheet, StarWarsCharacterSheet, L5RCharacterSheet, CustomCharacterSheet } from 'src/app/models/character-sheet.model';
import { all_characters } from 'src/mocks/Character'
import { PlayersService } from '../players/players.service';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  readonly default_template = 'D&D';
  private template: string;
  private customSheet: CharacterSheet;
  private empty_characters: () => CharacterSheet; // Fonction renvoyant une fiche de personnage vide

  characters: CharacterSheet[];

  constructor(private playerService: PlayersService) {
    this.characters = playerService.isHost? all_characters: [];
    this.template = this.default_template;
  }

  setCustomSheet(sheet: CharacterSheet) {
    this.customSheet = sheet;
  }

  getCustomSheet() {
    return this.customSheet
  }

  getTemplate() {
    return this.template;
  }

  setTemplate(new_template) {
    this.template = new_template;
  }

  private selectCharacterSheetTemplate() {
    switch(this.template) {
      case 'Aventure':
        this.empty_characters = () => {
          return new AventureCharacterSheet();
        }
        break;
      case 'WtA':
        this.empty_characters = () => {
          return new WtACharacterSheet();
        }
        break;
      case 'SW':
        this.empty_characters = () => {
          return new StarWarsCharacterSheet();
        }
        break;
      case 'L5R':
        this.empty_characters = () => {
          return new L5RCharacterSheet();
        }
        break;
      case 'Custom':
        this.empty_characters = () => {
          return new CustomCharacterSheet(this.customSheet);
        }
        break;
      case 'D&D':
      default:
        this.empty_characters = () => {
          return new DnDCharacterSheet();
        }
        break;
    }
  }

  getEmptyCharacter() {
    this.selectCharacterSheetTemplate();
    return this.empty_characters();
  }

  getCharacter(index) {
    if (index === null) { // Si le MJ veut créer une nouveau PNJ
      return undefined;
    } else {
      return this.characters[index];
    }
  }

  remove(character: CharacterSheet) {
    this.characters.splice(this.characters.indexOf(character),1);
  }

  addCharacter(character: CharacterSheet) {
    this.characters.push(character);
  }

  import(character: CharacterSheet) {
    if (this.playerService.isHost) {
      this.characters.push(character);
    } else {
      this.characters[0] = character;
    }
  }

}
