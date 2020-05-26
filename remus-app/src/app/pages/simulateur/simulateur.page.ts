import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-simulateur',
  templateUrl: './simulateur.page.html',
  styleUrls: ['./simulateur.page.scss'],
})
export class SimulateurPage implements OnInit {

  public diceHistory: string[];
  constructor() { }

  ngOnInit() {
  }

}
