import { Component, OnInit, Input } from '@angular/core';
import { DiceRoll } from 'src/app/models/dice-roll.model';
import { DiceHistoryService } from 'src/app/providers/dice/dice-history.service';

@Component({
  selector: 'app-roll-history',
  templateUrl: './roll-history.component.html',
  styleUrls: ['./roll-history.component.scss'],
})
export class RollHistoryComponent implements OnInit {

  @Input()
  private roll: DiceRoll;

  constructor(private historyService:DiceHistoryService) {
    this.roll={result:0,modificator:0,dices:null}
  }

  ngOnInit() {}

}
