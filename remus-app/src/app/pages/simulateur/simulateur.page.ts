import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { IonSlides, AlertController, ModalController } from '@ionic/angular';
import { DiceHistoryService } from 'src/app/providers/dice/dice-history.service';
import { DiceRoll } from 'src/app/models/dice-roll.model';

@Component({
  selector: 'app-simulateur',
  templateUrl: './simulateur.page.html',
  styleUrls: ['./simulateur.page.scss'],
})
export class SimulateurPage implements OnInit {

  @ViewChild('slides', {
    static: true
  }) slider: IonSlides;

  //Simulateur var
  @Input() isModal : boolean;
  public diceHistory: string[];
  segment = 0;


  //Historique var
  finalValue: string;
  finalHistory: DiceRoll[];

  //Dice thrower var
  result : number;
  diceSum : number;
  diceSelected : any;
  selectedDices : string;
  separetedValue : string;
  finalSeparatedValue : string;
  launched : boolean;
  modifying : boolean;
  totalDiceSum : number;
  dices : number[];
  modificateur : number;
  modifResult : string;




  constructor(public alertController: AlertController,
    private diceHistoryService: DiceHistoryService, private modalCtrl: ModalController)  { }

  ngOnInit() {
    this.modificateur = 0;
    this.diceSum = 0;
    this.totalDiceSum = 0;
    this.diceSelected = {};
    this.selectedDices = "";
   this.separetedValue = "";
    this.launched = false;
    this.finalSeparatedValue = "";
    this.dices = [];
    this.modifying = false;

    this.finalHistory = [];
  }

  ionViewDidEnter() {
    this.finalHistory = this.diceHistoryService.history;
  }

  //Simulateur funcitons
  async segmentChanged(ev: any) {
    await this.slider.slideTo(this.segment);
  }

  async slideChanged() {
    this.segment = await this.slider.getActiveIndex();
  }


  //Dice thrower functions
  getRandomInt(max) {
    let res = (Math.floor(Math.random() * Math.floor(max))) + 1;
    return res
  }

  printSumDices(map) {
    this.selectedDices = ""
    for (var dice in map) {
      if (this.selectedDices == "") {
        this.selectedDices = this.diceSelected[dice] + dice;
      } else {
        this.selectedDices = this.selectedDices + " + " + this.diceSelected[dice] + dice;
      }
    }
  }

  modifyResult(){
    this.modificateur = parseInt((document.getElementById("modif") as HTMLInputElement).value, 10);
    console.log(this.modificateur)
  }

  increaseDiceSum(i: number, dice: string) {
    if (this.launched == true) {
      this.launched = false;
      this.dices = [];
      this.diceSelected = {};
      this.diceSum = 0;
      this.separetedValue = "";
      this.totalDiceSum = 0;
      this.modifResult = "";
      this.modifying = false;

    }
    this.dices.push(i);
    this.totalDiceSum = this.totalDiceSum + i;

    if (this.diceSelected[dice] == undefined){
      this.diceSelected[dice] = 1;
    } else {
      this.diceSelected[dice] += 1;
    }
    this.printSumDices(this.diceSelected as Map<string,number>);

  }

  resetDices() {
    this.diceSum = 0;
    this.dices = [];
    this.diceSelected = {};
    this.printSumDices(this.diceSelected);
    this.totalDiceSum = 0;
    this.finalSeparatedValue = "";
    this.result  = null;
    this.modificateur = 0;
    this.modifying = false;
  }

  async presentAlertConfirm(data) {
    const title = this.selectedDices + (this.modificateur>0? (' + '+ this.modificateur): '')
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
    if (this.selectedDices === "") {
      this.noDiceAlert();
      return;
    }
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
    this.modifResult = this.diceSum.toString() + " + " + this.modificateur.toString();
    this.result = this.diceSum + this.modificateur;
    this.finalSeparatedValue = this.separetedValue;
    this.launched = true;
    this.presentAlertConfirm('<h1>' + this.result + '</h1>' + '<br>' + this.finalSeparatedValue)
   this.diceHistoryService.addDiceRoll({
      dices: this.diceSelected,
      modificator: (this.modificateur > 0? this.modificateur: undefined),
      separatedValue: this.finalSeparatedValue,
      result: this.result,
    });
  }

}