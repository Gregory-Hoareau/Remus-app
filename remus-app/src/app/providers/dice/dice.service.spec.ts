import { TestBed } from '@angular/core/testing';
import { DiceRoll } from 'src/app/models/dice-roll.model';
import { Dice } from 'src/app/models/dice.model';

import { DiceService } from './dice.service';

describe('DiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DiceService = TestBed.get(DiceService);
    expect(service).toBeTruthy();
  });

  it('should add and roll dice', () => {
    const service: DiceService = TestBed.get(DiceService);
    service.AddSelectedDice(new Dice('d4', 4));
    service.AddSelectedDice(new Dice('d6', 6));
    const resultRoll:DiceRoll = service.launchDice();

    expect(resultRoll.result).toBeGreaterThanOrEqual(2);
    expect(resultRoll.result).toBeLessThanOrEqual(10);
  });

  it('should have 5 different separated value', () => {
    const service: DiceService = TestBed.get(DiceService);

    service.AddSelectedDice(new Dice('d4', 4));
    service.AddSelectedDice(new Dice('d4', 4));
    service.AddSelectedDice(new Dice('d4', 4));
    const resultRoll:DiceRoll = service.launchDice();
    expect(resultRoll.separatedValue.length).toBe(17);
  });
});
