import { Injectable } from '@angular/core';
import { Macro } from 'src/app/models/macro.model';
import {Dice} from '../../models/dice.model';
import {SpecialDice} from '../../models/special-dice.model';
import { MathsService } from '../maths/maths.service';

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
  diceSum : number;
  specialDices: SpecialDice[];
  diceSelected : Map<SpecialDice, number>;
  specialDiceSet: string;
  separetedValue : string;
  specialFaces: string[];
  modifying : boolean;
  totalDiceSum : number;
  dices : number[];
  modificateur : number;
  modifResult : string;

  constructor(public mathsService: MathsService) {
    this.Normal = [];
    this.StarWars = [];
    this.LegendOfTheFiveRings = [];
    this.specialGame = new Map<string, Dice[]>();
    this.Normal.push(
        {name: 'd4', value: 4},
        {name: 'd6', value: 6},
        {name: 'd8', value: 8},
        {name: 'd10', value: 10},
        {name: 'd12', value: 12},
        {name: 'd20', value: 20},
        {name: 'd100', value: 100});

    this.StarWars.push(
        {name: ' Fortune', value: 6, faces: this.fillTheTab(6, 'starWars/fortune')},
        {name: ' Aptitude', value: 8, faces: this.fillTheTab(8, 'starWars/aptitude')},
        {name: ' Maîtrise', value: 12, faces: this.fillTheTab(12, 'starWars/maitrise')},
        {name: ' Infortune', value: 6, faces: this.fillTheTab(6, 'starWars/infortune')},
        {name: ' Difficulté', value: 8, faces: this.fillTheTab(8, 'starWars/difficulte')},
        {name: ' Défi', value: 12, faces: this.fillTheTab(12, 'starWars/defi')},
        {name: ' Force', value: 12, faces: this.fillTheTab(12, 'starWars/force')}

    );

    this.LegendOfTheFiveRings.push(
        {name: ' Noir', value: 6, faces: this.fillTheTab(6, 'L5RDice/noir')},
        {name: ' Blanc', value: 12, faces: this.fillTheTab(12, 'L5RDice/blanc')}
    )

    this.specialGame.set('Normal', this.Normal);
    this.specialGame.set('Star Wars', this.StarWars);
    this.specialGame.set('Legend Of The Five Rings', this.LegendOfTheFiveRings);

  }

  fillTheTab(value, path) {
    const Tab = Array<string>();
    for (let i = 1; i <= value; i++) {
      Tab.push('/assets/' + path + '/' + i + '.png');
    }
    return Tab;
  }

  //TODO : Move to provider
  macroLaunch(macro: Macro) {
    if (this.normalDices !== macro.isItNormalDices){
      this.normalDices = macro.isItNormalDices;
      this.typeOfDiceHasBeenChanged = true;
    }
    this.resetDices()
    this.modificateur = macro.modificator;
    this.diceSelected = macro.dices;
    for (const dice of this.diceSelected.keys()) {
      for (let itter = 0 ; itter < this.diceSelected.get(dice) ; itter++ ) {
        this.dices.push(dice.value);
        this.specialDices.push(dice);
        this.totalDiceSum += dice.value;
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
      this.dices.push(dice.value);
      this.specialDices.push(dice);
      this.totalDiceSum = this.totalDiceSum + dice.value;
    const temp = this.diceSelected.get(dice)
    console.log(temp)
    if (!this.diceSelected.has(dice)) {
      this.diceSelected.set(dice, 1);
      console.log(this.diceSelected.get(dice))
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
    this.modificateur = 0;
    this.modifying = false;
    this.separetedValue = '';
    this.specialDices = [];
    this.specialFaces = [];
  }

    //TODO : Move to dice provider
    launchDice(){
      if (this.normalDices) {
        for (let dice of this.dices) {
          let res = this.mathsService.getRandomInt(dice);
          this.diceSum = this.diceSum + res;
          if (this.separetedValue === '') {
            this.separetedValue = res.toString();
          } else {
            this.separetedValue = this.separetedValue + ' - ' + res.toString();
          }
        }
        if (this.modificateur !== 0) {
          this.modifying = true;
        }
        if (this.modificateur > 0){
          this.modifResult = this.diceSum.toString() + ' + ' + this.modificateur.toString();
        }else if (this.modificateur < 0){
          this.modifResult = this.diceSum.toString() + this.modificateur.toString();
        } else {
          this.modifResult = this.diceSum.toString();
        }
      } // Break seperation with inheritence 
    }

}
