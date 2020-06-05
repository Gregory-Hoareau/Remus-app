import { Injectable } from '@angular/core';
import {Dice} from '../../models/dice.model';

@Injectable({
  providedIn: 'root'
})
export class DiceService {

  diceList: Dice[];
  constructor() {
    this.diceList = [];
    this.diceList.push(
        {name: 'd4', value: 4},
        {name: 'd6', value: 6},
        {name: 'd8', value: 8},
        {name: 'd10', value: 10},
        {name: 'd12', value: 12},
        {name: 'd20', value: 20},
        {name: 'd100', value: 100});
  }
}
