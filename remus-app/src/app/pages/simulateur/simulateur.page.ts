import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { IonSlides, AlertController, ModalController } from '@ionic/angular';
import { DiceHistoryService } from 'src/app/providers/diceHistory/dice-history.service';
import { DiceRoll } from 'src/app/models/dice-roll.model';
import { Macro } from 'src/app/models/macro.model';
import {MacroService} from '../../providers/macro/macro.service';
import {Dice} from '../../models/dice.model';
import {DiceService} from '../../providers/dice/dice.service';


@Component({
  selector: 'app-simulateur',
  templateUrl: './simulateur.page.html',
  styleUrls: ['./simulateur.page.scss'],
})
export class SimulateurPage implements OnInit {

  @ViewChild('slides', {
    static: true
  }) slider: IonSlides;

  // Simulateur var
  @Input() isModal: boolean;
  public diceHistory: string[];
  segment = 0;


  // Historique var
  finalValue: string;

  // Dice thrower var
  result : number;
  diceSum : number;
    diceSelected : Map<Dice, number>;
  selectedDices : string;
  separetedValue : string;
  finalSeparatedValue : string;
  launched : boolean;
  modifying : boolean;
  totalDiceSum : number;
  dices : number[];
  modificateur : number;
  modifResult : string;




  constructor(public alertController: AlertController, private diceService: DiceService,
    private diceHistoryService: DiceHistoryService, private modalCtrl: ModalController, private alertCtrl: AlertController, private macroService: MacroService)  { }

  ngOnInit() {
    this.modificateur = 0;
    this.diceSum = 0;
    this.totalDiceSum = 0;
    this.diceSelected = new Map<Dice, number>();
    this.selectedDices = "";
   this.separetedValue = "";
    this.launched = false;
    this.finalSeparatedValue = "";
    this.dices = [];
    this.modifying = false;
  }

  ionViewDidEnter() {
    this.slider.update()
    console.table(this.macroService.macros);
  }

  async newMacroAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Nouvelle Macro',
      inputs: [{
        name: 'macroName',
        type: 'text',
        placeholder: 'Nom de la macro',
      }],
      buttons: [{
        text: 'Valider',
        handler: data => {
          if (data.macroName !== '') {
              const macro = {
                name: data.macroName,
                dices: this.diceSelected,
                stringDices: this.selectedDices,
                modificator: this.modificateur,
              } as Macro
              this.macroService.macros.push(macro);
          }
        }
      }]
    });
    await alert.present();
  }

  macroLaunch(dices, modificator) {
    this.resetDices()
    this.modificateur = modificator;
    this.diceSelected = dices;
    for (const dice of this.diceSelected.keys()) {
      for (let itter = 0 ; itter < this.diceSelected.get(dice) ; itter++ ) {
        this.dices.push(dice.value);
      }
    }
    this.printSumDices(this.diceSelected);
    this.launchDice();
  }
  // Simulateur funcitons
  async segmentChanged(ev: any) {
    await this.slider.slideTo(this.segment);
  }

  async slideChanged() {
    this.segment = await this.slider.getActiveIndex();
  }


  // Dice thrower functions
  getRandomInt(max) {
    const res = (Math.floor(Math.random() * Math.floor(max))) + 1;
    return res;
  }

  printSumDices(map: Map<Dice, number>) {
    this.selectedDices = ''
    for (const dice of map.keys()) {
      if (this.selectedDices === '') {
        this.selectedDices = this.diceSelected.get(dice) + dice.name;
      } else {
        this.selectedDices = this.selectedDices + ' + ' + this.diceSelected.get(dice) + dice.name;
      }
      console.log(dice);
    }
  }

  modifyResult(){
    this.modificateur = parseInt((document.getElementById("modif") as HTMLInputElement).value, 10);
    console.log(this.modificateur)
  }

  increaseDiceSum(dice: Dice) {
    if (this.launched === true) {
      this.launched = false;
      this.dices = [];
      this.diceSelected = new Map<Dice, number>();
      this.diceSum = 0;
      this.separetedValue = '';
      this.totalDiceSum = 0;
      this.modifResult = '';
      this.modifying = false;
    }
    this.dices.push(dice.value);
    this.totalDiceSum = this.totalDiceSum + dice.value;
    const temp = this.diceSelected.get(dice)
    console.log(temp)
    if (!this.diceSelected.has(dice)) {
      this.diceSelected.set(dice, 1);
      console.log(this.diceSelected.get(dice))
    } else {
      this.diceSelected.set(dice, temp + 1);
    }
    console.log(this.diceSelected)
    this.printSumDices(this.diceSelected);

  }

  resetDices() {
    this.diceSum = 0;
    this.dices = [];
    this.diceSelected = new Map<Dice, number>();
    this.printSumDices(this.diceSelected);
    this.totalDiceSum = 0;
    this.finalSeparatedValue = '';
    this.result  = null;
    this.modificateur = 0;
    this.modifying = false;
  }

  async presentAlertConfirm(data) {
    let title;
    if (this.modificateur > 0) {
      title = this.selectedDices + ' + ' + this.modificateur;
    } else if (this.modificateur < 0) {
      title = this.selectedDices + this.modificateur;
    } else {
      title = this.selectedDices + '';
    }
    const alert = await this.alertController.create({
      header: title,
      message: data,
      cssClass: 'dice_result',
      buttons: [
        {
          text: 'Ok',
          role: 'Ok',
          cssClass: 'buttons',
          handler: () => {
          }
        }, {
          cssClass: 'buttons',
          text: 'Again',
          handler: () => {
            this.launchDice();
          }
        }
      ]
    });
    await alert.present();
    const result = await alert.onDidDismiss();
    console.log(result);
  }

  async noDiceAlert() {
    const alert = await this.alertController.create({
      header: 'Aucun dé sélectionné',
      message: 'Vous devez choisir au moins un dé pour pouvoir faire une lancé de dé',
      buttons: ['Compris'],
    });
    await alert.present();
  }

  launchDice(){
    if (this.launched) {
      this.launched = false;
      this.diceSum = 0;
      this.separetedValue = "";
      this.modifResult = "";
      this.modifying = false;
    }
    for (var dice of this.dices) {
      let res = this.getRandomInt(dice);
      this.diceSum = this.diceSum + res;
      if (this.separetedValue == "") {
        this.separetedValue = res.toString();
      } else {
        this.separetedValue = this.separetedValue + " - " + res.toString();
      }
    }
    console.log(this.totalDiceSum)
    if(this.modificateur != 0){
      this.modifying = true;
    }
    if (this.modificateur > 0){
      this.modifResult = this.diceSum.toString() + " + " + this.modificateur.toString();
    }else if (this.modificateur < 0){
      this.modifResult = this.diceSum.toString() + this.modificateur.toString();
    } else {
      this.modifResult = this.diceSum.toString();
    }
    this.result = this.diceSum + this.modificateur;
    this.finalSeparatedValue = this.separetedValue;
    this.launched = true;
    this.presentAlertConfirm('<h1>' + this.result + '</h1>' + '<br>' + this.finalSeparatedValue)
    this.diceHistoryService.addDiceRoll({
      dices: this.diceSelected,
      modificator: (this.modificateur === 0? this.modificateur: undefined),
      separatedValue: this.finalSeparatedValue,
      result: this.result,
    });
  }


}
