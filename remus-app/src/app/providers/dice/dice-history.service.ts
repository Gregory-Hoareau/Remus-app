import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DiceHistoryService {

  diceHistory: string[];

  constructor() {
    this.diceHistory = [];
  }
}
