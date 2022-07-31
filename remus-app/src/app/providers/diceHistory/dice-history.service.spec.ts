import { TestBed } from '@angular/core/testing';

import { DiceHistoryService } from './dice-history.service';
import {Dice} from "../../models/dice.model";
import {DiceRoll} from "../../models/dice-roll.model";

describe('DiceHistoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DiceHistoryService = TestBed.get(DiceHistoryService);
    expect(service).toBeTruthy();
  });

  it('should add a roll to history', () => {
    const service: DiceHistoryService = TestBed.get(DiceHistoryService);
    const d4: Dice =  new Dice('d4',4);
    const d12: Dice =  new Dice('d12',12);
    const diceSelected = new Map<Dice, number>();
    diceSelected.set(d4, 3);
    diceSelected.set(d12, 2);
    const roll = {
      dices: diceSelected,
      modificator: 5,
      result: 29,
      separatedValue: '3 - 2 - 3 - 9 - 12'
    } as DiceRoll;
    service.addDiceRoll(roll);
    service.addDiceRoll(roll);
    expect(service.history.length).toBe(2);
    expect(service.history[0]).toEqual(roll);
    expect(service.selectedDiceString(roll)).toEqual('3d4 + 2d12 + 5');
  });
});
