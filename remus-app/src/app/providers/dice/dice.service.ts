import { Injectable } from '@angular/core';
import { Macro } from 'src/app/models/macro.model';
import { SOUNDS } from 'src/mocks/Track';
import {Dice} from '../../models/dice.model';
import {SpecialDice} from '../../models/special-dice.model';
import { MusicService } from '../music/music.service';

@Injectable({
  providedIn: 'root'
})
export class DiceService {

  Normal: Dice[];
  StarWars: SpecialDice[];
  LegendOfTheFiveRings: SpecialDice[];
  specialGame: Map<string, Dice[]>;

  normalDices: boolean = true;
  typeOfDiceHasBeenChanged: boolean;
  diceSum : any;
  specialDices: SpecialDice[];
  diceSelected : Map<Dice, number>;
  specialDiceSet: string;
  separetedValue : string;
  specialFaces: string[];
  modifying : boolean;
  totalDiceSum : number;
  dices : number[];
  modifier : number;
  modifResult : string;

  constructor(public musicService:MusicService) {
    this.Normal = [];
    this.StarWars = [];
    this.LegendOfTheFiveRings = [];
    this.specialGame = new Map<string, Dice[]>();
    this.Normal.push(
      new Dice('d4',4),
      new Dice('d6',6),
      new Dice('d8',8),
      new Dice('d10',10),
      new Dice('d12',12),
      new Dice('d20',20),
      new Dice('d100',100))
  }

  fillTheTab(value, path) {
    const Tab = Array<string>();
    for (let i = 1; i <= value; i++) {
      Tab.push('/assets/' + path + '/' + i + '.png');
    }
    return Tab;
  }

  macroLaunch(macro: Macro) {
    if (this.normalDices !== macro.isItNormalDices){
      this.normalDices = macro.isItNormalDices;
      this.typeOfDiceHasBeenChanged = true;
    }
    this.resetDices()
    this.modifier = macro.modifier;
    this.diceSelected = macro.dices;
    for (const dice of this.diceSelected.keys()) {
      for (let itter = 0 ; itter < this.diceSelected.get(dice) ; itter++ ) {
        this.dices.push(dice.numberOfFaces);
        this.specialDices.push(dice);
        this.totalDiceSum += dice.numberOfFaces;
      }
    }
    this.launchDice();
  }


  //Kinda get it, change the text variable but yuk!
  //Should make a toString function on dice array item
  printSumDices(map: Map<Dice, number>) {
    var listOfDiceAsString = ''
    for (const dice of map.keys()) {
      if (listOfDiceAsString === '') {
        listOfDiceAsString = this.diceSelected.get(dice) + dice.name;
      } else {
        listOfDiceAsString = listOfDiceAsString + ' + ' + this.diceSelected.get(dice) + dice.name;
      }
    }
    return listOfDiceAsString;
  }

  increaseDiceSum(dice: SpecialDice, launched: boolean) {
    if (launched === true) {
      launched = false;
      this.dices = [];
      this.diceSelected = new Map<SpecialDice, number>();
      this.diceSum = 0;
      this.separetedValue = '';
      this.totalDiceSum = 0;
      this.modifResult = '';
      this.modifying = false;
      this.specialDices = [];
      this.specialFaces = [];
    }
      this.dices.push(dice.numberOfFaces);
      this.specialDices.push(dice);
      this.totalDiceSum = this.totalDiceSum + dice.numberOfFaces;
    const temp = this.diceSelected.get(dice)
    if (!this.diceSelected.has(dice)) {
      this.diceSelected.set(dice, 1);
    } else {
      this.diceSelected.set(dice, temp + 1);
    }
    return this.printSumDices(this.diceSelected);
  }

  resetDices() {
    this.diceSum = 0;
    this.dices = [];
    this.diceSelected = new Map<SpecialDice, number>();
    this.totalDiceSum = 0;
    this.modifier = 0;
    this.modifying = false;
    this.separetedValue = '';
    this.specialDices = [];
    this.specialFaces = [];
  }

  launchDice(dices: Map<Dice,Number> = this.diceSelected): any[]{
    var seperatedValues = []
    dices.forEach((value, dice, _) => {
      for (let i = 0; i < value; i++) {
        seperatedValues.push(dice.getRandomface())  
      }
    })
    this.musicService.launchSound(SOUNDS[0]);
    return seperatedValues;
  }

  AddSelectedDice(dice:Dice){
    var value = this.diceSelected.get(dice)
    if (value)
      this.diceSelected.set(dice, value+1)
    else
      this.diceSelected.set(dice, 1)
  }

  StringifySelectedDice(){
    var stringifiedDice = ""
    this.diceSelected.forEach((value, dice, _ )=> 
      stringifiedDice += value + dice.name + " "
    );
    return stringifiedDice;
  }

}
