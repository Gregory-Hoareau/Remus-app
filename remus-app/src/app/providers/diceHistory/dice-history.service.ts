import { Injectable } from '@angular/core';
import { DiceRoll } from 'src/app/models/dice-roll.model';

@Injectable({
  providedIn: 'root'
})
export class DiceHistoryService {

  private hist: DiceRoll[];

  constructor() {
    this.hist = [];
  }

  get history() {
    return this.hist
  }

  addDiceRoll(roll: DiceRoll) {
    this.hist.push(roll)
  }

}
