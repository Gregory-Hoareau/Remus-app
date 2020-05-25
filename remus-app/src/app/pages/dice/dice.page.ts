import {Component, Input, OnInit} from '@angular/core';
import {printLine} from "tslint/lib/verify/lines";
import {forEachComment} from "tslint";
import {AlertController} from '@ionic/angular';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-dice',
  templateUrl: './dice.page.html',
  styleUrls: ['./dice.page.scss'],
})
export class DicePage implements OnInit {

  constructor(public alertController: AlertController) { }
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
  }

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

  resetDices(){
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
      return
    }
    if (this.launched == true) {
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
    /*if (this.modificateur != 0) {
      this.presentAlertConfirm(this.finalSeparatedValue + '<br>' + this.modifResult + '<br>' + '<h1>' + this.result + '</h1>')
    }else{
      this.presentAlertConfirm(this.finalSeparatedValue + '<br>' + '<h1>' + this.result + '</h1>')
    }*/
  }
}
