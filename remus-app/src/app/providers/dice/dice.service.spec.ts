import { TestBed } from '@angular/core/testing';
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
    service.launchDice();
    
    expect(component.result).toBeGreaterThanOrEqual(2);
    expect(component.result).toBeLessThanOrEqual(10);
    expect(component.totalDiceSum).toBe(10);
  });
  it('should have 5 different separated value', () => {
    component.increaseDiceSum({name: 'd4', value: 4});
    component.increaseDiceSum({name: 'd4', value: 4});
    component.increaseDiceSum({name: 'd4', value: 4});
    component.increaseDiceSum({name: 'd4', value: 4});
    component.increaseDiceSum({name: 'd4', value: 4});
    component.launchDice();
    expect(component.finalSeparatedValue.length).toBe(17);
  });
});
