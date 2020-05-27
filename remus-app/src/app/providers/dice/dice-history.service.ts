import { Injectable } from '@angular/core';
import { DiceRoll } from 'src/app/models/dice-roll.model';

@Injectable({
  providedIn: 'root'
})
export class DiceHistoryService {

  private diceHistory: string[];
  private hist: DiceRoll[];

  constructor() {
    this.diceHistory = [];
    this.hist = [];
  }

  get history() {
    return this.hist
  }

  addDiceRoll(roll: DiceRoll) {
    this.hist.push(roll)
  }

  selectedDiceString(roll: DiceRoll) {
    let res = "";
    for(const die in roll.dices) {
      if (res !== "") {
        res+= ' + ';
      }
      res += roll.dices[die] + die;
    }
    if (roll.modificator) {
      res+= ' + ' + roll.modificator;
    }
    return res;
  }

}
