import { Injectable } from '@angular/core';
import {Dice} from '../../models/dice.model';
import {SpecialDice} from '../../models/special-dice.model';

@Injectable({
  providedIn: 'root'
})
export class DiceService {

  Normal: Dice[];
  StarWars: SpecialDice[];
  LegendOfTheFiveRings: SpecialDice[];
  specialGame: Map<string, Dice[]>;

  constructor() {
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
}
