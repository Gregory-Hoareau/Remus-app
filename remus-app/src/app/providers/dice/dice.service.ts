import { Injectable } from '@angular/core';
import { DiceRoll } from 'src/app/models/dice-roll.model';
import { Macro } from 'src/app/models/macro.model';
import { SOUNDS } from 'src/mocks/Track';
import {Dice} from '../../models/dice.model';
import {SpecialDice} from '../../models/special-dice.model';
import { DiceHistoryService } from '../diceHistory/dice-history.service';
import { MusicService } from '../music/music.service';

@Injectable({
  providedIn: 'root'
})
export class DiceService {

  Normal: Dice[];

  normalDices: boolean = true;
  diceSelected : Map<Dice, number> = new Map<Dice, number>();
  modifier : number;

  constructor(public musicService:MusicService, public historyService:DiceHistoryService) {
    this.Normal = [];
    this.Normal.push(
      new Dice('d4',4),
      new Dice('d6',6),
      new Dice('d8',8),
      new Dice('d10',10),
      new Dice('d12',12),
      new Dice('d20',20),
      new Dice('d100',100))
  }

  //Reset the dice choices and modifier to 0
  resetDices() {
    this.diceSelected.clear();
    this.modifier = undefined;
  }

  //Calculates the roll of the dice. Returns a DiceRoll object with the result of the roll, the dice string and individual roll detail.
  launchDice(dices: Map<Dice,number> = this.diceSelected, modifier?:number): DiceRoll{
    var rolls = []
    var valuesString = ""
    var roll_name = this.StringifyDice(dices)
    var result:number = 0;

    this.musicService.launchSound(SOUNDS[0]);

    //random rolls
    dices.forEach((value, dice, _) => {
      for (let i = 0; i < value; i++) {
        rolls.push(dice.getRandomface())  
      }
    })

    //result
    rolls.forEach(roll =>{
      result += roll
      valuesString += roll + " + "
    })
    valuesString =  valuesString.substring(0, valuesString.length-2);

    //modifier effect
    if(modifier){
      result += modifier

      var modif:string = modifier > 0 ? `+ ${modifier}` : `${modifier}`
      valuesString += modif
      roll_name += modif
    }
    
    var diceRoll:DiceRoll = {
      name:roll_name,
      result:result,
      separatedValue:valuesString,
      modificator:modifier
    }

    //Memorise dice roll in history
    this.historyService.addDiceRoll(diceRoll)

    return diceRoll;
  }

  //Adds a Dice object to the current selection of dice. If that dice exists already, increments the count in diceSelected
  AddSelectedDice(dice:Dice){
    var value = this.diceSelected.get(dice)
    if (value)
      this.diceSelected.set(dice, value+1)
    else
      this.diceSelected.set(dice, 1)
  }

  //Returns the dice under a string form. Format follows classic dice rules XdY
  StringifyDice(dice:Map<Dice, number> = this.diceSelected){
    var stringifiedDice = ""
    dice.forEach((value, dice, _ )=> 
      stringifiedDice += value + dice.name + " "
    );
    return stringifiedDice;
  }

}
