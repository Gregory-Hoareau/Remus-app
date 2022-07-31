import { Component, OnInit, Input } from '@angular/core';
import { DiceRoll } from 'src/app/models/dice-roll.model';
import { DiceHistoryService } from 'src/app/providers/diceHistory/dice-history.service';
import { Dice } from 'src/app/models/dice.model';

@Component({
  selector: 'app-roll-history',
  templateUrl: './roll-history.component.html',
  styleUrls: ['./roll-history.component.scss'],
})
export class RollHistoryComponent implements OnInit {

  @Input()
  roll: DiceRoll;

  constructor(public historyService:DiceHistoryService) {
    this.roll={result:0,modificator:0,name:'',faces: [], separatedValue:""}
  }

  ngOnInit() {
  }

}
