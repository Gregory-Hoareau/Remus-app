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
  createMacro(name, diceSelected, listOfDiceAsString, modificateur){
    const macro = {
      name: name,
      dices: diceSelected,
      stringDices: listOfDiceAsString,
      modificator: modificateur,
    } as Macro
    this.macros.push(macro);
  }
}
