import { Component, OnInit } from '@angular/core';
import {DiceHistoryService} from "../../providers/dice/dice-history.service";
import {forEachComment} from "tslint";

@Component({
  selector: 'app-historique',
  templateUrl: './historique.page.html',
  styleUrls: ['./historique.page.scss'],
})
export class HistoriquePage implements OnInit {
  finalValue: string;
  finalHistory: string[];
  constructor(  private diceHistoryService: DiceHistoryService
  ) {
  }

  ngOnInit() {
    this.finalHistory = [];

  }

  ionViewDidEnter() {
    this.finalHistory = [];
    this.diceHistoryService.diceHistory.forEach(e => {
      this.finalHistory.push(e);
      console.table(this.finalHistory);
    });
  }


}
