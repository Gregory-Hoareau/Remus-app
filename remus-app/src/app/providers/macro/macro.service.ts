import { Injectable } from '@angular/core';
import {Macro} from '../../models/macro.model';

@Injectable({
  providedIn: 'root'
})
export class MacroService {

  macros: Macro[];
  constructor() {
    this.macros = [];
  }

  createMacro(name, diceSelected, listOfDiceAsString, modifier, isItNormal){
    const macro = {
      name: name,
      dices: diceSelected,
      stringDices: listOfDiceAsString,
      modifier: modifier,
      isItNormalDices: isItNormal,
    } as Macro
    console.log(macro);
    this.macros.push(macro);
  }
}
