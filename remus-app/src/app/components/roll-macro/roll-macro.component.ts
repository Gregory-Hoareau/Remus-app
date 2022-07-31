import {Component, Input, OnInit} from '@angular/core';
import {Macro} from '../../models/macro.model';

@Component({
  selector: 'app-roll-macro',
  templateUrl: './roll-macro.component.html',
  styleUrls: ['./roll-macro.component.scss'],
})
export class RollMacroComponent implements OnInit {

  @Input()
  private macro: Macro;

  constructor() {
    this.macro = {name: '', dices: null, modifier: 0, stringDices: '', isItNormalDices: true};
  }

  ngOnInit() {
    console.log(this.macro);
  }

}
