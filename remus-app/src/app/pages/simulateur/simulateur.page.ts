import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { IonSlides, AlertController, ModalController } from '@ionic/angular';
import { DiceHistoryService } from 'src/app/providers/diceHistory/dice-history.service';
import { Macro } from 'src/app/models/macro.model';
import {MacroService} from '../../providers/macro/macro.service';
import {Dice} from '../../models/dice.model';
import {DiceService} from '../../providers/dice/dice.service';
import {Gyroscope, GyroscopeOptions, GyroscopeOrientation} from '@ionic-native/gyroscope/ngx';
import {DeviceMotion, DeviceMotionAccelerationData} from "@ionic-native/device-motion/ngx";
import {Shake} from "@ionic-native/shake/ngx";
import {SpecialDice} from "../../models/special-dice.model";


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
  normalDices: boolean;
  typeOfDiceHasBeenChanged: boolean;
  gyroscope : boolean;
  result : number;
  diceSum : number;
  specialDices: SpecialDice[];
  diceSelected : Map<SpecialDice, number>;
  specialDiceSet: string;
  listOfDiceAsString : string;
  separetedValue : string;
  specialFaces: string[];
  finalSeparatedValue : string;
  launched : boolean;
  modifying : boolean;
  totalDiceSum : number;
  dices : number[];
  modificateur : number;
  modifResult : string;
  sub: any;




  constructor(public shakeDetector: Shake, public alertController: AlertController, public diceService: DiceService,
    public diceHistoryService: DiceHistoryService, private modalCtrl: ModalController, private alertCtrl: AlertController, public macroService: MacroService)  { }

  ngOnInit() {
    this.typeOfDiceHasBeenChanged = false;
    this.specialDiceSet = '';
    this.normalDices = true;
    this.gyroscope = false;
    this.modificateur = 0;
    this.diceSum = 0;
    this.totalDiceSum = 0;
    this.diceSelected = new Map<SpecialDice, number>();
    this.listOfDiceAsString = "";
    this.separetedValue = "";
    this.launched = false;
    this.finalSeparatedValue = "";
    this.dices = [];
    this.modifying = false;
    this.specialFaces = [];
    this.specialDices = [];
  }

  ionViewDidEnter() {
    this.slider.update()
    console.table(this.macroService.macros);
  }

  async specialDicesAlert() {
    const tab = [];
    for (const i of this.diceService.specialGame.keys()) {
      if ( i === 'Normal') {
        tab.push({
          label: i,
          type: 'radio' as const,
          value: i,
          checked: true,
        });
      } else {
        tab.push({
          label: i,
          type: 'radio' as const,
          value: i,
        });
      }
    }
    const alert = await this.alertCtrl.create({
      header: 'Sélectionner le JDR dont vous souhaitez utiliser les dés spéciaux :',
      inputs: tab,
      buttons: [{
        text: 'Valider',
        handler: data => {
          this.resetDices();
          if (this.diceService.specialGame.get(data) === this.diceService.Normal) {
            this.normalDices = true;
          } else {
            this.normalDices = false;
            this.specialDiceSet = data;
          }
        }
      }]
    });
    await alert.present();
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
            this.macroService.createMacro(data.macroName, this.diceSelected, this.listOfDiceAsString, this.modificateur, this.normalDices);
          }
        }
      }]
    });
    await alert.present();
  }

  macroLaunch(macro: Macro) {
    if (this.normalDices !== macro.isItNormalDices){
      this.normalDices = macro.isItNormalDices;
      this.typeOfDiceHasBeenChanged = true;
    }
    this.resetDices()
    this.modificateur = macro.modificator;
    this.diceSelected = macro.dices;
    for (const dice of this.diceSelected.keys()) {
      for (let itter = 0 ; itter < this.diceSelected.get(dice) ; itter++ ) {
        this.dices.push(dice.value);
        this.specialDices.push(dice);
        this.totalDiceSum += dice.value;
      }
    }
    this.launchDice();
  }
  // Simulateur funcitons
  async segmentChanged(ev: any) {
    await this.slider.slideTo(this.segment);
  }

  async slideChanged() {
    this.segment = await this.slider.getActiveIndex();
  }

  gyroscopeSetting() {
    if (this.gyroscope) {
      this.sub.unsubscribe();
      this.gyroscope = false;
    } else if (!this.gyroscope){
      this.sub = this.shakeDetector.startWatch(50).subscribe(() => {
        this.launchDice();
      });
      this.gyroscope = true;
    }
  }

  // Dice thrower functions
  getRandomInt(max) {
    const res = (Math.floor(Math.random() * Math.floor(max))) + 1;
    return res;
  }

  printSumDices(map: Map<Dice, number>) {
    this.listOfDiceAsString = ''
    for (const dice of map.keys()) {
      if (this.listOfDiceAsString === '') {
        this.listOfDiceAsString = this.diceSelected.get(dice) + dice.name;
      } else {
        this.listOfDiceAsString = this.listOfDiceAsString + ' + ' + this.diceSelected.get(dice) + dice.name;
      }
      console.log(dice);
    }
  }

  modifyResult(){
    this.modificateur = parseInt((document.getElementById("modif") as HTMLInputElement).value, 10);
    console.log(this.modificateur)
  }

  increaseDiceSum(dice: SpecialDice) {
    if (this.launched === true) {
      this.launched = false;
      this.dices = [];
      this.diceSelected = new Map<SpecialDice, number>();
      this.diceSum = 0;
      this.separetedValue = '';
      this.totalDiceSum = 0;
      this.modifResult = '';
      this.modifying = false;
      this.specialDices = [];
      this.specialFaces = [];
    }
      this.dices.push(dice.value);
      this.specialDices.push(dice);
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
    this.diceSelected = new Map<SpecialDice, number>();
    this.printSumDices(this.diceSelected);
    this.totalDiceSum = 0;
    this.finalSeparatedValue = '';
    this.result  = null;
    this.modificateur = 0;
    this.modifying = false;
    this.separetedValue = '';
    this.specialDices = [];
    this.specialFaces = [];
  }

  async presentAlertConfirm(data) {
    let title;
    if (this.modificateur > 0) {
      title = this.listOfDiceAsString + ' + ' + this.modificateur;
    } else if (this.modificateur < 0) {
      title = this.listOfDiceAsString + this.modificateur;
    } else {
      title = this.listOfDiceAsString + '';
    }
    const alert = await this.alertController.create({
      header: title,
      message: data,
      cssClass: 'dice_result',
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          cssClass: 'buttons',
          handler: () => {
            if(this.typeOfDiceHasBeenChanged) {
              this.typeOfDiceHasBeenChanged = false;
              this.normalDices = !this.normalDices;
              this.resetDices();
            }
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

  async presentAlertConfirmSpecial(data: string[]) {
    let message = '';
    for (const path of data) {
      message = message + '<ion-img class="resultPopupDices" src=' + path + '></ion-img>';
    }
    const finalResult = '<div class="popupSpecialDice">' + message + '</div>';
    const alert = await this.alertController.create({
      backdropDismiss: false,
      message: finalResult,
      cssClass: 'dice_result',
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          cssClass: 'buttons',
          handler: () => {
            if(this.typeOfDiceHasBeenChanged) {
              this.typeOfDiceHasBeenChanged = false;
              this.normalDices = !this.normalDices;
              this.resetDices();
            }
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
      this.specialFaces =  [];
    }
    if (this.normalDices) {
      for (let dice of this.dices) {
        let res = this.getRandomInt(dice);
        this.diceSum = this.diceSum + res;
        if (this.separetedValue === '') {
          this.separetedValue = res.toString();
        } else {
          this.separetedValue = this.separetedValue + ' - ' + res.toString();
        }
      }
      console.log(this.totalDiceSum)
      if (this.modificateur !== 0) {
        this.modifying = true;
      }
      if (this.modificateur > 0){
        this.modifResult = this.diceSum.toString() + ' + ' + this.modificateur.toString();
      }else if (this.modificateur < 0){
        this.modifResult = this.diceSum.toString() + this.modificateur.toString();
      } else {
        this.modifResult = this.diceSum.toString();
      }
      this.result = this.diceSum + this.modificateur;
      this.finalSeparatedValue = this.separetedValue;
      this.presentAlertConfirm('<h1>' + this.result + '</h1>' + '<br>' + this.finalSeparatedValue)
      this.diceHistoryService.addDiceRoll({
        dices: this.diceSelected,
        modificator: (this.modificateur === 0? undefined: this.modificateur),
        separatedValue: this.finalSeparatedValue,
        result: this.result,
      });
    } else {
      for (const dice of this.specialDices) {
        console.log(dice)
        let res = this.getRandomInt(dice.value);
        this.specialFaces.push(dice.faces[res - 1]);
      }
      this.presentAlertConfirmSpecial(this.specialFaces);
      console.log(this.totalDiceSum);
      this.diceHistoryService.addDiceRoll({
        dices: this.diceSelected,
        faces: this.specialFaces,
      });
    }
    this.launched = true;
  }


}
