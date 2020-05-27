import { Component, OnInit } from '@angular/core';
import {DiceHistoryService} from "../../providers/dice/dice-history.service";
import {forEachComment} from "tslint";
import { DiceRoll } from 'src/app/models/dice-roll.model';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.page.html',
  styleUrls: ['./historique.page.scss'],
})
export class HistoriquePage implements OnInit {
  finalValue: string;
  finalHistory: DiceRoll[];
  constructor(private diceHistoryService: DiceHistoryService) {
  }

  ngOnInit() {
    this.finalHistory = [];

  }

  ionViewDidEnter() {
    this.finalHistory = this.diceHistoryService.history;
  }

}
