import { TestBed } from '@angular/core/testing';

import { MacroService } from './macro.service';
import {Dice} from "../../models/dice.model";
import {Macro} from "../../models/macro.model";

describe('MacroService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MacroService = TestBed.get(MacroService);
    expect(service).toBeTruthy();
  });

  it('should create a macro', () => {
    const service: MacroService = TestBed.get(MacroService);
    const d4: Dice =  {name: 'd4', value: 4};
    const d12: Dice =  {name: 'd12', value: 12};
    const diceSelected = new Map<Dice, number>();
    diceSelected.set(d4, 3);
    diceSelected.set(d12, 2);
    const macroTest = {
      name: 'boule de feu',
      dices: diceSelected,
      stringDices: '2d4 + 1d12',
      modificator: 0,
    } as Macro;
    service.createMacro('boule de feu', diceSelected, '2d4 + 1d12', 0);
    expect(service.macros.length).toBe(1);
    expect(service.macros[0]).toEqual(macroTest);
  });
});
