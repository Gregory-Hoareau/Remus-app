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
    for(const die of roll.dices) {
      console.log('DIE')
      console.log(die)
      if (res !== "") {
        res+= ' + ';
      }
      res += die[1] + die[0].name;
    }
    if (roll.modificator) {
      if(roll.modificator > 0) {
        res+= ' + ' + roll.modificator;
      } else {
        res+= ' - ' + Math.abs(roll.modificator)
      }
      
    }
    console.log(res);
    return res;
  }

}
